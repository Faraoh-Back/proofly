#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, 
    Env, Address, String, Vec, Map
};

// Implementar traits de NFT
use soroban_token::{TokenInterface, TokenMetadata};

#[contracttype]
#[derive(Clone)]
pub struct BadgeNFT {
    pub token_id: u32,
    pub owner: Address,
    pub org: u32,
    pub uri: String,
    pub badge_type: String,
    pub name: String,
    pub description: String,
    pub acronym: String
}

#[contracttype]
pub enum DataKey {
    Admin,
    TokenData(u32),           // token_id -> BadgeNFT  
    TokenOwner(u32),          // token_id -> Address
    OwnerTokens(Address),     // owner -> Vec<token_id>
    TokenApprovals(u32),      // token_id -> Address (approved)
    OperatorApprovals(Address, Address), // (owner, operator) -> bool
    TotalSupply,
    TokenMetadata(u32),       // token_id -> TokenMetadata
}

#[contract]
pub struct BadgeContract;

#[contractimpl]
impl BadgeContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().persistent().set(&DataKey::TotalSupply, &0u32);
    }

    // Implementar funcionalidades básicas de NFT
    pub fn mint(env: Env, to: Address, token_id: u32, uri: String, badge_type: String, name: String, description: String) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        // Verificar se token já existe
        if env.storage().persistent().has(&DataKey::TokenOwner(token_id)) {
            panic!("Token already exists");
        }

        // Criar NFT
        let nft = BadgeNFT {
            token_id,
            owner: to.clone(),
            org: 0, // ou passar como parâmetro
            uri: uri.clone(),
            badge_type,
            name: name.clone(),
            description: description.clone(),
            acronym: String::from_str(&env, "")
        };

        // Armazenar dados do token
        env.storage().persistent().set(&DataKey::TokenData(token_id), &nft);
        env.storage().persistent().set(&DataKey::TokenOwner(token_id), &to);

        // Atualizar lista de tokens do owner
        let mut owner_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::OwnerTokens(to.clone()))
            .unwrap_or(Vec::new(&env));
        owner_tokens.push_back(token_id);
        env.storage().persistent().set(&DataKey::OwnerTokens(to.clone()), &owner_tokens);

        // Atualizar supply total
        let mut total_supply: u32 = env.storage().persistent()
            .get(&DataKey::TotalSupply)
            .unwrap_or(0);
        total_supply += 1;
        env.storage().persistent().set(&DataKey::TotalSupply, &total_supply);

        // Criar metadata
        let metadata = TokenMetadata {
            name: name.clone(),
            symbol: String::from_str(&env, "BADGE"),
            decimals: 0, // NFTs têm 0 decimais
        };
        env.storage().persistent().set(&DataKey::TokenMetadata(token_id), &metadata);

        // Emitir evento (se necessário)
        // env.events().publish(("mint",), (to, token_id));
    }

    // Transferir NFT
    pub fn transfer(env: Env, from: Address, to: Address, token_id: u32) {
        from.require_auth();

        let current_owner: Address = env.storage().persistent()
            .get(&DataKey::TokenOwner(token_id))
            .expect("Token does not exist");

        if current_owner != from {
            panic!("Not token owner");
        }

        // Atualizar owner
        env.storage().persistent().set(&DataKey::TokenOwner(token_id), &to);

        // Atualizar listas de tokens
        self.remove_token_from_owner(&env, &from, token_id);
        self.add_token_to_owner(&env, &to, token_id);

        // Limpar aprovações
        env.storage().persistent().remove(&DataKey::TokenApprovals(token_id));
    }

    // Aprovar transferência
    pub fn approve(env: Env, spender: Address, token_id: u32) {
        let owner: Address = env.storage().persistent()
            .get(&DataKey::TokenOwner(token_id))
            .expect("Token does not exist");
        
        owner.require_auth();
        env.storage().persistent().set(&DataKey::TokenApprovals(token_id), &spender);
    }

    // Funções de consulta
    pub fn owner_of(env: Env, token_id: u32) -> Address {
        env.storage().persistent()
            .get(&DataKey::TokenOwner(token_id))
            .expect("Token does not exist")
    }

    pub fn balance_of(env: Env, owner: Address) -> u32 {
        env.storage().persistent()
            .get(&DataKey::OwnerTokens(owner))
            .unwrap_or(Vec::new(&env))
            .len()
    }

    pub fn token_uri(env: Env, token_id: u32) -> String {
        let nft: BadgeNFT = env.storage().persistent()
            .get(&DataKey::TokenData(token_id))
            .expect("Token does not exist");
        nft.uri
    }

    pub fn total_supply(env: Env) -> u32 {
        env.storage().persistent().get(&DataKey::TotalSupply).unwrap_or(0)
    }

    // Funções auxiliares
    fn remove_token_from_owner(&self, env: &Env, owner: &Address, token_id: u32) {
        let mut tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::OwnerTokens(owner.clone()))
            .unwrap_or(Vec::new(env));
        
        // Encontrar e remover token
        for i in 0..tokens.len() {
            if tokens.get(i).unwrap() == token_id {
                tokens.remove(i);
                break;
            }
        }
        
        env.storage().persistent().set(&DataKey::OwnerTokens(owner.clone()), &tokens);
    }

    fn add_token_to_owner(&self, env: &Env, owner: &Address, token_id: u32) {
        let mut tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::OwnerTokens(owner.clone()))
            .unwrap_or(Vec::new(env));
        tokens.push_back(token_id);
        env.storage().persistent().set(&DataKey::OwnerTokens(owner.clone()), &tokens);
    }
}