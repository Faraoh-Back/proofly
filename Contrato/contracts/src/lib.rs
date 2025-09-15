#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, 
    Address, Env, String, Vec
};

#[contracttype]
#[derive(Clone)]
pub struct NFTMetadata {
    pub name: String,
    pub symbol: String,
    pub uri: String,        // URI para metadados (imagem, descrição, etc)
    pub owner: Address,
    pub token_id: u32,
}

#[contracttype]
pub enum DataKey {
    TokenOwner(u32),        // Mapeia token_id -> owner
    TokenMetadata(u32),     // Mapeia token_id -> metadata
    Balance(Address),       // Quantidade de NFTs por endereço
    TotalSupply,
    Approved(u32),          // Aprovações para transferência
    Admin,
    UserTokens(Address), // Mapeia um endereço para um Vetor de token_ids 
}

#[contract]
pub struct NFTContract;

#[contractimpl]
impl NFTContract {

    // Função para ser chamada uma única vez, na inicialização e definir o "Dono" do Token
    pub fn initialize(env: Env, admin: Address) {
        // Garante que o admin só pode ser setado uma vez
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    // Função para mintar (criar) um NFT
    pub fn mint(
        env: Env,
        to: Address,
        token_id: u32,
        name: String,
        symbol: String,
        uri: String
    ) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();

        // Verificar autorização (apenas admin pode mintar)
        admin.require_auth();
        
        // Criar metadata do NFT
        let metadata = NFTMetadata {
            name,
            symbol,
            uri,
            owner: to.clone(),
            token_id,
        };
        
        // Salvar no storage
        env.storage().persistent().set(
            &DataKey::TokenOwner(token_id), 
            &to
        );
        env.storage().persistent().set(
            &DataKey::TokenMetadata(token_id), 
            &metadata
        );
        
        // Atualizar balance
        let mut balance = Self::balance_of(env.clone(), to.clone());
        balance += 1;
        env.storage().persistent().set(
            &DataKey::Balance(to.clone()), 
            &balance
        );

        // Adicionar token à lista do usuário
        let mut user_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::UserTokens(to.clone())).unwrap_or(Vec::new(&env));
        user_tokens.push_back(token_id);
        env.storage().persistent().set(&DataKey::UserTokens(to), &user_tokens);
    }
    
    // Função principal para transferir NFT
    pub fn transfer(
        env: Env,
        from: Address,
        to: Address,
        token_id: u32
    ) {
        // Verificar se o remetente é o dono
        from.require_auth();
        
        let current_owner = env.storage()
            .persistent()
            .get::<_, Address>(&DataKey::TokenOwner(token_id))
            .unwrap();
            
        assert!(current_owner == from, "Not the owner");
        
        // Atualizar proprietário
        env.storage().persistent().set(
            &DataKey::TokenOwner(token_id), 
            &to
        );
        
        // Atualizar metadata
        let mut metadata: NFTMetadata = env.storage()
            .persistent()
            .get(&DataKey::TokenMetadata(token_id))
            .unwrap();
        metadata.owner = to.clone();
        env.storage().persistent().set(
            &DataKey::TokenMetadata(token_id), 
            &metadata
        );

        // Remover token da lista do 'from'
        let mut from_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::UserTokens(from.clone())).unwrap_or(Vec::new(&env));
        if let Some(pos) = from_tokens.iter().position(|x| x == token_id) {
            from_tokens.remove(pos.try_into().unwrap()); // Converte usize para u32
        }
        env.storage().persistent().set(&DataKey::UserTokens(from.clone()), &from_tokens);

        // Adicionar token à lista do 'to'
        let mut to_tokens: Vec<u32> = env.storage().persistent()
            .get(&DataKey::UserTokens(to.clone())).unwrap_or(Vec::new(&env));
        to_tokens.push_back(token_id);
        env.storage().persistent().set(&DataKey::UserTokens(to.clone()), &to_tokens);

        // Atualizar balances
        let from_balance = Self::balance_of(env.clone(), from.clone()) - 1;
        let to_balance = Self::balance_of(env.clone(), to.clone()) + 1;
        
        env.storage().persistent().set(
            &DataKey::Balance(from), 
            &from_balance
        );
        env.storage().persistent().set(
            &DataKey::Balance(to), 
            &to_balance
        );
    }
    
    // Função para verificar saldo - CORRIGIDA: sem referências
    pub fn balance_of(env: Env, owner: Address) -> u32 {
        env.storage()
            .persistent()
            .get(&DataKey::Balance(owner))
            .unwrap_or(0)
    }

    // Função pública no smart contract
    pub fn get_token_metadata(env: Env, token_id: u32) -> NFTMetadata {
        env.storage()
            .persistent()
            .get(&DataKey::TokenMetadata(token_id))
            .unwrap()
    }
    
    pub fn tokens_of_owner(env: Env, owner: Address) -> Vec<u32> {
        env.storage().persistent().get(&DataKey::UserTokens(owner)).unwrap_or(Vec::new(&env))
    }
}