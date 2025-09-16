#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, Bytes, Env, String, Vec, vec, log, symbol_short,
    BytesN, Symbol, Val  // ✅ Imports corretos
};

// Error types for better error handling
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotAuthorized = 1,
    OrgAlreadyExists = 2,
    OrgNotFound = 3,
    InvalidInput = 4,
}

// Organization data structure
#[contracttype]
#[derive(Clone)]
pub struct Organization {
    pub id: Bytes,
    pub name: String,
    pub admin: Address,
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
    /// Initialize the contract with an admin address
    pub fn initialize(env: Env, admin: Address) {
        // Ensure not already initialized
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract already initialized");
        }
        
        // Store admin address
        env.storage().instance().set(&DataKey::Admin, &admin);
        
        // Emit initialization event
        env.events().publish(
            (symbol_short!("init"),),
            admin.clone()
        );
        
        log!(&env, "Organization contract initialized with admin: {}", admin);
    }
    
    /// Create a new organization and deploy an event contract
    pub fn create_org(
        env: Env,
        org_id: Bytes,
        name: String,
        event_contract_wasm_hash: BytesN<32>  // ✅ BytesN<32> está correto
    ) -> Result<Address, Error> {
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        // Check if org already exists
        if env.storage().persistent().has(&DataKey::OrgExists(org_id.clone())) {
            return Err(Error::OrgAlreadyExists);
        }
        
        // Validate inputs
        if name.len() == 0 || org_id.len() == 0 {
            return Err(Error::InvalidInput);
        }
        
        // Deploy event contract for this organization
        let salt = env.crypto().sha256(&org_id);
        let event_contract_addr = env.deployer().with_current_contract(salt)
            .deploy(event_contract_wasm_hash);
        
        // Initialize the event contract - ✅ Usando symbol_short! em vez de Symbol::new
        let init_args = vec![
            &env,
            org_id.clone().to_val(),
            name.clone().to_val(),
            admin.clone().to_val()
        ];
        env.invoke_contract::<()>(
            &event_contract_addr, 
            &symbol_short!("init"), 
            init_args
        );
        
        // Create organization struct
        let org = Organization {
            id: org_id.clone(),
            name: name.clone(),
            admin: admin.clone(),
            event_contracts: vec![&env, event_contract_addr.clone()],
            created_at: env.ledger().timestamp(),
            is_active: true,
        };
        
        // Store organization data
        env.storage().persistent().set(&DataKey::Organization(org_id.clone()), &org);
        env.storage().persistent().set(&DataKey::OrgExists(org_id.clone()), &true);
        
        // Emit event
        env.events().publish(
            (symbol_short!("org_new"), org_id.clone()),
            (name, event_contract_addr.clone())
        );
        
        log!(&env, "Organization created: {}", name);
        
        Ok(event_contract_addr)
    }
    
    /// Get all event contracts for an organization
    pub fn get_org_events(env: Env, org_id: Bytes) -> Result<Vec<Address>, Error> {
        // Check if org exists
        if !env.storage().persistent().has(&DataKey::OrgExists(org_id.clone())) {
            return Err(Error::OrgNotFound);
        }
        
        // Get organization data
        let org: Organization = env.storage().persistent()
            .get(&DataKey::Organization(org_id))
            .unwrap();
        
        Ok(org.event_contracts)
    }
    
    /// Add a new event contract to an existing organization
    pub fn add_event_contract(
        env: Env,
        org_id: Bytes,
        event_contract: Address
    ) -> Result<(), Error> {
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        // Get organization
        if !env.storage().persistent().has(&DataKey::OrgExists(org_id.clone())) {
            return Err(Error::OrgNotFound);
        }
        
        let mut org: Organization = env.storage().persistent()
            .get(&DataKey::Organization(org_id.clone()))
            .unwrap();
        
        // Add event contract
        org.event_contracts.push_back(event_contract.clone());
        
        // Update storage
        env.storage().persistent().set(&DataKey::Organization(org_id.clone()), &org);
        
        // Emit event
        env.events().publish(
            (symbol_short!("evt_add"), org_id),
            event_contract
        );
        
        Ok(())
    }
    
    /// Deactivate an organization
    pub fn deactivate_org(env: Env, org_id: Bytes) -> Result<(), Error> {
        // Verify caller is admin
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        // Get organization
        if !env.storage().persistent().has(&DataKey::OrgExists(org_id.clone())) {
            return Err(Error::OrgNotFound);
        }
        
        let mut org: Organization = env.storage().persistent()
            .get(&DataKey::Organization(org_id.clone()))
            .unwrap();
        
        // Deactivate
        org.is_active = false;
        
        // Update storage
        env.storage().persistent().set(&DataKey::Organization(org_id.clone()), &org);
        
        // Emit event
        env.events().publish(
            (symbol_short!("org_deact"), org_id),
            ()
        );
        
        Ok(())
    }

    /// Get organization details
    pub fn get_org(env: Env, org_id: Bytes) -> Result<Organization, Error> {
        if !env.storage().persistent().has(&DataKey::OrgExists(org_id.clone())) {
            return Err(Error::OrgNotFound);
        }
        
        let org: Organization = env.storage().persistent()
            .get(&DataKey::Organization(org_id))
            .unwrap();
        
        Ok(org)
    }
}