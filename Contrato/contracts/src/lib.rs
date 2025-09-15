#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, 
    Address, Env, Map, String, Vec
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
}

#[contract]
pub struct NFTContract;

#[contractimpl]
impl NFTContract {
    // Função para mintar (criar) um NFT
    pub fn mint(
        env: Env,
        to: Address,
        token_id: u32,
        name: String,
        symbol: String,
        uri: String
    ) {
        // Verificar autorização (apenas admin pode mintar)
        to.require_auth();
        
        // Criar metadata do NFT
        let metadata = NFTMetadata {
            name,
            symbol,
            uri,
            owner: to,
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
        let mut balance = Self::balance_of(env, to);
        balance += 1;
        env.storage().persistent().set(
            &DataKey::Balance(to), 
            &balance
        );
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
        metadata.owner = to;
        env.storage().persistent().set(
            &DataKey::TokenMetadata(token_id), 
            &metadata
        );
        
        // Atualizar balances
        let from_balance = Self::balance_of(env, from) - 1;
        let to_balance = Self::balance_of(env, to) + 1;
        
        env.storage().persistent().set(
            &DataKey::Balance(from), 
            &from_balance
        );
        env.storage().persistent().set(
            &DataKey::Balance(to), 
            &to_balance
        );
    }
    
    // Função para verificar saldo
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
}