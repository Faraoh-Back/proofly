#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, 
    Env, Address, Vec, String
};

#[contracttype]
#[derive(Clone)]
pub struct OrganizationData {
    pub id: u32,
    pub owner: Address,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Organizations(Address),   // Dono -> Vec<org_id>
    Organization(u32),        // org_id -> OrganizationData
    TotalOrganizations,
}

#[contract]
pub struct ProflyContract;

#[contractimpl]
impl ProflyContract {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    pub fn create_organization(env: Env, caller: Address, org_id: u32) {
        caller.require_auth();

        // Registrar organização
        let org = OrganizationData { id: org_id, owner: caller.clone() };
        env.storage().persistent().set(&DataKey::Organization(org_id), &org);

        // Adicionar à lista do criador
        let mut orgs: Vec<u32> = env.storage().persistent()
            .get(&DataKey::Organizations(caller.clone())).unwrap_or(Vec::new(&env));
        orgs.push_back(org_id);
        env.storage().persistent().set(&DataKey::Organizations(caller), &orgs);

        // Atualizar total
        let mut total: u32 = env.storage().persistent()
            .get(&DataKey::TotalOrganizations).unwrap_or(0);
        total += 1;
        env.storage().persistent().set(&DataKey::TotalOrganizations, &total);
    }

    pub fn get_organizations(env: Env, owner: Address) -> Vec<u32> {
        env.storage().persistent()
            .get(&DataKey::Organizations(owner))
            .unwrap_or(Vec::new(&env))
    }

    pub fn get_organization(env: Env, org_id: u32) -> OrganizationData {
        env.storage().persistent().get(&DataKey::Organization(org_id)).unwrap()
    }
}
