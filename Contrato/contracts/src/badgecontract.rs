#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, 
    Env, Address, String, Vec
};

#[contracttype]
#[derive(Clone)]
pub struct BadgeNFT {
    pub id: u32,
    pub receiver: Address,
    pub uri: String,
}

#[contracttype]
pub enum DataKey {
    Admin,
    NFTs(u32),                // nft_id -> BadgeNFT
    Receivers(Address),       // user -> Vec<nft_id>
    TotalNFTs,
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
    }

    pub fn mint_badge(env: Env, caller: Address, nft_id: u32, to: Address, uri: String) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth(); // só admin do contrato pode mintar

        let nft = BadgeNFT { id: nft_id, receiver: to.clone(), uri };
        env.storage().persistent().set(&DataKey::NFTs(nft_id), &nft);

        // registrar no receiver
        let mut recvs: Vec<u32> = env.storage().persistent()
            .get(&DataKey::Receivers(to.clone())).unwrap_or(Vec::new(&env));
        recvs.push_back(nft_id);
        env.storage().persistent().set(&DataKey::Receivers(to), &recvs);

        let mut total: u32 = env.storage().persistent()
            .get(&DataKey::TotalNFTs).unwrap_or(0);
        total += 1;
        env.storage().persistent().set(&DataKey::TotalNFTs, &total);
    }

    pub fn get_nft(env: Env, nft_id: u32) -> BadgeNFT {
        env.storage().persistent().get(&DataKey::NFTs(nft_id)).unwrap()
    }

    pub fn get_received(env: Env, user: Address) -> Vec<u32> {
        env.storage().persistent()
            .get(&DataKey::Receivers(user))
            .unwrap_or(Vec::new(&env))
    }

    pub fn total_nfts(env: Env) -> u32 {
        env.storage().persistent().get(&DataKey::TotalNFTs).unwrap_or(0)
    }
}
