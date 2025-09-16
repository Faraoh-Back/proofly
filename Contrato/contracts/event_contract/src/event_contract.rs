#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Bytes, Env, Map, String, Vec, vec, log, symbol_short
};

// NFT data structure
#[contracttype]
#[derive(Clone)]
pub struct EventNFT {
    pub token_id: u32,                // ✅ Mudança: u32 em vez de Bytes
    pub organization_id: Bytes,
    pub event_name: String,
    pub recipient: Address,
    pub issue_date: u64,
    pub metadata_uri: String,
    pub attributes: Map<String, String>,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Admin,
    OrgId,
    EventName,
    NFT(u32),                         // ✅ Mudança: u32 em vez de Bytes
    OwnerTokens(Address),
    TokenOwner(u32),                  // ✅ Mudança: u32 em vez de Bytes
    TokenCounter,
    TransfersEnabled,
}

#[contract]
pub struct EventContract;

#[contractimpl]
impl EventContract {
    /// Initialize the event contract
    pub fn __constructor(
        env: Env,
        org_id: Bytes,
        event_name: String,
        admin: Address
    ) {
        // Ensure not already initialized
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract already initialized");
        }
        
        // Store initialization data
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::OrgId, &org_id);
        env.storage().instance().set(&DataKey::EventName, &event_name);
        env.storage().instance().set(&DataKey::TokenCounter, &0u32);  // ✅ Mudança: u32
        env.storage().instance().set(&DataKey::TransfersEnabled, &false);

    }
    
    /// Mint a new NFT for a participant
    pub fn mint_nft(
        env: Env,
        recipient: Address,
        metadata_uri: String,
        attributes: Map<String, String>
    ) {                          // ✅ Mudança: retorna u32
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        // Get current token counter and increment
        let mut counter: u32 = env.storage().instance().get(&DataKey::TokenCounter).unwrap();
        counter += 1;
        
        let token_id = counter;                        // ✅ Mudança: usar counter diretamente
        
        // Get organization and event info
        let org_id: Bytes = env.storage().instance().get(&DataKey::OrgId).unwrap();
        let event_name: String = env.storage().instance().get(&DataKey::EventName).unwrap();
        
        // Create NFT
        let nft = EventNFT {
            token_id: token_id,                        // ✅ Mudança: sem clone()
            organization_id: org_id,
            event_name: event_name.clone(),
            recipient: recipient.clone(),
            issue_date: env.ledger().timestamp(),
            metadata_uri: metadata_uri.clone(),
            attributes: attributes,
        };
        
        // Store NFT
        env.storage().persistent().set(&DataKey::NFT(token_id), &nft);              // ✅ Mudança: sem clone()
        env.storage().persistent().set(&DataKey::TokenOwner(token_id), &recipient); // ✅ Mudança: sem clone()
        
        // Update owner's token list
        let mut owner_tokens: Vec<u32> = env.storage().persistent()    // ✅ Mudança: Vec<u32>
            .get(&DataKey::OwnerTokens(recipient.clone()))
            .unwrap_or(vec![&env]);
        owner_tokens.push_back(token_id);                              // ✅ Mudança: sem clone()
        env.storage().persistent().set(&DataKey::OwnerTokens(recipient.clone()), &owner_tokens);
        
        // Update counter
        env.storage().instance().set(&DataKey::TokenCounter, &counter);
        
        // Emit minting event
        env.events().publish(
            (symbol_short!("nft_mint"), token_id),
            (recipient, metadata_uri)
        );
        
        log!(&env, "NFT minted for event: {}", event_name);
        
    }
    
    /// Get NFT details
    pub fn get_nft(env: Env, token_id: u32) -> Option<EventNFT> {  // ✅ Mudança: u32
        return env.storage().persistent()
            .get(&DataKey::NFT(token_id));
    }
    
    /// Get all NFTs owned by an address
    pub fn get_owner_nfts(env: Env, owner: Address) -> Vec<u32> {         // ✅ Mudança: Vec<u32>
        env.storage().persistent()
            .get(&DataKey::OwnerTokens(owner))
            .unwrap_or(vec![&env])
    }
    
    /// Get NFT owner
    pub fn get_nft_owner(env: Env, token_id: u32) {  // ✅ Mudança: u32
        env.storage().persistent()
            .get::<DataKey, Address>(&DataKey::TokenOwner(token_id));     // ✅ Mudança: anotação de tipo
    }
    
    /// Verify if an address owns a specific NFT
    pub fn verify_ownership(env: Env, owner: Address, token_id: u32) -> bool {  // ✅ Mudança: u32
        match env.storage().persistent().get::<DataKey, Address>(&DataKey::TokenOwner(token_id)) { // ✅ Mudança: anotação de tipo
            Some(actual_owner) => actual_owner == owner,
            None => false,
        }
    }
}