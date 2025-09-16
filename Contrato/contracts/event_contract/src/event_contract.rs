#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, Bytes, Env, Map, String, Vec, vec, log, symbol_short
};

// Error types
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotAuthorized = 1,
    TokenNotFound = 2,
    InvalidRecipient = 3,
    InvalidMetadata = 4,
    TransferNotAllowed = 5,
}

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
    pub fn initialize(
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
        
        // Emit initialization event
        env.events().publish(
            (symbol_short!("evt_init"),),
            (org_id.clone(), event_name.clone())
        );
        
        log!(&env, "Event contract initialized for: {}", event_name);
    }
    
    /// Mint a new NFT for a participant
    pub fn mint_nft(
        env: Env,
        recipient: Address,
        metadata_uri: String,
        attributes: Map<String, String>
    ) -> Result<u32, Error> {                          // ✅ Mudança: retorna u32
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        // Validate inputs
        if metadata_uri.len() == 0 {
            return Err(Error::InvalidMetadata);
        }
        
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
        
        Ok(token_id)                                   // ✅ Mudança: sem clone()
    }
    
    /// Transfer NFT to another address
    pub fn transfer_nft(
        env: Env,
        to: Address,
        token_id: u32                                  // ✅ Mudança: u32 em vez de Bytes
    ) -> Result<(), Error> {
        // Check if transfers are enabled
        let transfers_enabled: bool = env.storage().instance()
            .get(&DataKey::TransfersEnabled)
            .unwrap_or(false);
        
        if !transfers_enabled {
            return Err(Error::TransferNotAllowed);
        }
        
        // Get current owner
        let from: Address = env.storage().persistent()
            .get(&DataKey::TokenOwner(token_id))       // ✅ Mudança: sem clone()
            .ok_or(Error::TokenNotFound)?;
        
        // Verify caller is the current owner
        from.require_auth();
        
        // Update NFT owner in the NFT data
        let mut nft: EventNFT = env.storage().persistent()
            .get(&DataKey::NFT(token_id))              // ✅ Mudança: sem clone()
            .ok_or(Error::TokenNotFound)?;
        nft.recipient = to.clone();
        env.storage().persistent().set(&DataKey::NFT(token_id), &nft); // ✅ Mudança: sem clone()
        
        // Update token owner mapping
        env.storage().persistent().set(&DataKey::TokenOwner(token_id), &to); // ✅ Mudança: sem clone()
        
        // Update from owner's token list - ✅ Substituir retain por loop manual
        let mut from_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::OwnerTokens(from.clone()))
            .unwrap_or(vec![&env]);
        
        // Remover token da lista (substituindo retain)
        let mut new_from_tokens = vec![&env];
        for i in 0..from_tokens.len() {
            let token = from_tokens.get(i).unwrap();
            if token != token_id {
                new_from_tokens.push_back(token);
            }
        }
        from_tokens = new_from_tokens;
        env.storage().persistent().set(&DataKey::OwnerTokens(from.clone()), &from_tokens);
        
        // Update to owner's token list
        let mut to_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::OwnerTokens(to.clone()))
            .unwrap_or(vec![&env]);
        to_tokens.push_back(token_id);                 // ✅ Mudança: sem clone()
        env.storage().persistent().set(&DataKey::OwnerTokens(to.clone()), &to_tokens);
        
        // Emit transfer event
        env.events().publish(
            (symbol_short!("nft_xfer"), token_id),
            (from, to)
        );
        
        Ok(())
    }
    
    /// Enable or disable NFT transfers
    pub fn set_transfers_enabled(env: Env, enabled: bool) -> Result<(), Error> {
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        env.storage().instance().set(&DataKey::TransfersEnabled, &enabled);
        
        // Emit event
        env.events().publish(
            (symbol_short!("xfer_cfg"),),
            enabled
        );
        
        Ok(())
    }
    
    /// Get NFT details
    pub fn get_nft(env: Env, token_id: u32) -> Result<EventNFT, Error> {  // ✅ Mudança: u32
        env.storage().persistent()
            .get(&DataKey::NFT(token_id))
            .ok_or(Error::TokenNotFound)
    }
    
    /// Get all NFTs owned by an address
    pub fn get_owner_nfts(env: Env, owner: Address) -> Vec<u32> {         // ✅ Mudança: Vec<u32>
        env.storage().persistent()
            .get(&DataKey::OwnerTokens(owner))
            .unwrap_or(vec![&env])
    }
    
    /// Get NFT owner
    pub fn get_nft_owner(env: Env, token_id: u32) -> Result<Address, Error> {  // ✅ Mudança: u32
        env.storage().persistent()
            .get::<DataKey, Address>(&DataKey::TokenOwner(token_id))       // ✅ Mudança: anotação de tipo
            .ok_or(Error::TokenNotFound)
    }
    
    /// Verify if an address owns a specific NFT
    pub fn verify_ownership(env: Env, owner: Address, token_id: u32) -> bool {  // ✅ Mudança: u32
        match env.storage().persistent().get::<DataKey, Address>(&DataKey::TokenOwner(token_id)) { // ✅ Mudança: anotação de tipo
            Some(actual_owner) => actual_owner == owner,
            None => false,
        }
    }
}