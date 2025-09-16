#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Env, Address, Vec
};

#[contracttype]
#[derive(Clone)]
pub struct BadgeContractData {
    pub id: u32,
    pub creator: Address,
    pub badge_address: Address
}

#[contracttype]
pub enum DataKey {
    Admin,
    BadgeContracts(Address),   // dono -> Vec<badge_id>
    BadgeContract(u32),        // badge_id -> BadgeContractData
    TotalBadges,
}

#[contract]
pub struct OrganizationContract;

#[contractimpl]
impl OrganizationContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    pub fn create_badge_contract(env: Env, badge_id: u32, wasm_hash: BytesN<32>, salt: BytesN<32>, constructor_args: Vec<Val>) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let badge = BadgeContractData { id: badge_id, creator: admin.clone() };
        env.storage().persistent().set(&DataKey::BadgeContract(badge_id), &badge);

        // Adicionar à lista
        let mut badges: Vec<u32> = env.storage().persistent()
            .get(&DataKey::BadgeContracts(admin.clone())).unwrap_or(Vec::new(&env));
        badges.push_back(badge_id);
        env.storage().persistent().set(&DataKey::BadgeContracts(admin), &badges);

        let mut total: u32 = env.storage().persistent()
            .get(&DataKey::TotalBadges).unwrap_or(0);
        total += 1;
        env.storage().persistent().set(&DataKey::TotalBadges, &total);

        let deployed_address = env
            .deployer()
            .with_address(env.current_contract_address(), salt)
            .deploy_v2(wasm_hash, constructor_args);
            
        badge.badge_address = deployed_address;
    }

    pub fn get_badge_contracts(env: Env) -> Vec<u32> {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        env.storage().persistent()
            .get(&DataKey::BadgeContracts(admin.clone()))
            .unwrap_or(Vec::new(&env))
    }

    pub fn get_badge_contract(env: Env, badge_id: u32) -> BadgeContractData {
        env.storage().persistent().get(&DataKey::BadgeContract(badge_id)).unwrap()
    }
}
