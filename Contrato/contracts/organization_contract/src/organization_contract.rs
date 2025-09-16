#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Bytes, Env, IntoVal, String, Vec, Val, vec, log, symbol_short,
    BytesN  
};

// Organization data structure
#[contracttype]
#[derive(Clone)]
pub struct Organization {
    pub id: Bytes,
    pub name: String,
    pub company_address: Address,
    pub event_contracts: Vec<Address>,
    pub created_at: u64,
    pub is_active: bool,
}

// Storage keys
#[contracttype]
pub enum DataKey {
    Admin,
    Organization(Bytes),
    OrgExists(Bytes),
}

#[contract]
pub struct OrganizationContract;

#[contractimpl]
impl OrganizationContract {
    /// Initialize the contract with a company address
    pub fn __constructor(env: Env, company_address: Address) {
        // Ensure not already initialized
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract already initialized");
        }

        // Store company address
        env.storage().instance().set(&DataKey::Admin, &company_address);
    }
    
    /// Create a new organization and deploy an event contract
    pub fn create_event_contract(
        env: Env,
        org_id: Bytes,
        name: String,
        event_contract_wasm_hash: BytesN<32>  // ✅ BytesN<32> está correto
    ) {
        let company_address: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        company_address.require_auth();

        // Deploy event contract for this organization
        let salt = env.crypto().sha256(&org_id);
        let event_contract_addr = env
            .deployer()
            .with_address(company_address.clone(), salt)
            .deploy(event_contract_wasm_hash);
        
        // Initialize the event contract - ✅ Usando symbol_short! em vez de Symbol::new
        let init_args: Vec<Val> = (
            org_id.clone(),
            name.clone(),
            company_address.clone()
        ).into_val(&env);
        env.invoke_contract::<()>(
            &event_contract_addr, 
            &symbol_short!("init"), 
            init_args
        );
        
        let events: Vec<Address> = vec![&env, event_contract_addr.clone()];


        // Create organization struct
        let org = Organization {
            id: org_id.clone(),
            name: name.clone(),
            company_address: company_address.clone(),
            event_contracts: events,
            created_at: env.ledger().timestamp(),
            is_active: true,
        };
        
        // Store organization data
        env.storage().persistent().set(&DataKey::Organization(org_id.clone()), &org);
        env.storage().persistent().set(&DataKey::OrgExists(org_id.clone()), &true);
    
    }
    
    /// Get all event contracts for an organization
    pub fn get_org_events(env: Env, org_id: Bytes) -> Organization {
        
        // Get organization data
        let org: Organization = env.storage().persistent()
            .get(&DataKey::Organization(org_id))
            .unwrap();

        return org;
        
    }
}