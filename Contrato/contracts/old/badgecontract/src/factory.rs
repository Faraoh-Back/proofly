#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, Address, Bytes, String, Env, Vec,
    BytesN, IntoVal, Val,
};

#[contract]
pub struct NFTFactory;

#[contracttype]
pub enum DataKey {
    Admin,
    DeployedContracts,
    ContractWasm,
    ContractCount,
}

#[contracttype]
pub struct DeployedNFT {
    pub contract_id: Address,
    pub deployer: Address,
    pub name: String,
    pub symbol: String,
    pub timestamp: u64,
}

#[contractimpl]
impl NFTFactory {
    /// Initialize the factory with admin and NFT contract WASM hash
    pub fn initialize(env: Env, admin: Address, nft_wasm_hash: BytesN<32>) {
        // Ensure this is only called once
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Factory already initialized");
        }
        
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::ContractWasm, &nft_wasm_hash);
        env.storage().instance().set(&DataKey::ContractCount, &0u32);
        
        let deployed_contracts: Vec<DeployedNFT> = Vec::new(&env);
        env.storage().instance().set(&DataKey::DeployedContracts, &deployed_contracts);
        
        env.events().publish(
            (symbol_short!("init"),),
            (admin, nft_wasm_hash)
        );
    }

    /// Deploy a new NFT contract instance
    pub fn deploy_nft(
        env: Env,
        deployer: Address,
        salt: BytesN<32>,
        name: String,
        symbol: String,
    ) -> Address {
        deployer.require_auth();

        // Get the NFT contract WASM hash
        let wasm_hash: BytesN<32> = env.storage()
            .instance()
            .get(&DataKey::ContractWasm)
            .expect("Factory not initialized");

        // Deploy the contract
        let deployed_address = env
            .deployer()
            .with_address(deployer.clone(), salt)
            .deploy(wasm_hash);

        // Update contract count
        let mut count: u32 = env.storage()
            .instance()
            .get(&DataKey::ContractCount)
            .unwrap_or(0);
        count += 1;
        env.storage().instance().set(&DataKey::ContractCount, &count);

        // Store deployment info
        let deployed_nft = DeployedNFT {
            contract_id: deployed_address.clone(),
            deployer: deployer.clone(),
            name: name.clone(),
            symbol: symbol.clone(),
            timestamp: env.ledger().timestamp(),
        };

        let mut deployed_contracts: Vec<DeployedNFT> = env.storage()
            .instance()
            .get(&DataKey::DeployedContracts)
            .unwrap_or_else(|| Vec::new(&env));
        
        deployed_contracts.push_back(deployed_nft);
        env.storage().instance().set(&DataKey::DeployedContracts, &deployed_contracts);

        // Emit deployment event
        env.events().publish(
            (symbol_short!("deploy"),),
            (deployed_address.clone(), deployer, name, symbol)
        );

        deployed_address
    }

    /// Get all deployed NFT contracts
    pub fn get_deployed_contracts(env: Env) -> Vec<DeployedNFT> {
        env.storage()
            .instance()
            .get(&DataKey::DeployedContracts)
            .unwrap_or_else(|| Vec::new(&env))
    }

    /// Get deployed contracts by deployer
    pub fn get_contracts_by_deployer(env: Env, deployer: Address) -> Vec<DeployedNFT> {
        let all_contracts: Vec<DeployedNFT> = env.storage()
            .instance()
            .get(&DataKey::DeployedContracts)
            .unwrap_or_else(|| Vec::new(&env));
        
        let mut user_contracts = Vec::new(&env);
        for contract in all_contracts.iter() {
            if contract.deployer == deployer {
                user_contracts.push_back(contract);
            }
        }
        user_contracts
    }

    /// Get total number of deployed contracts
    pub fn get_contract_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::ContractCount)
            .unwrap_or(0)
    }

    /// Get factory admin
    pub fn get_admin(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Factory not initialized")
    }

    /// Update NFT contract WASM hash (admin only)
    pub fn update_nft_wasm(env: Env, admin: Address, new_wasm_hash: BytesN<32>) {
        admin.require_auth();
        
        let current_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Factory not initialized");
        
        if admin != current_admin {
            panic!("Only admin can update WASM hash");
        }
        
        env.storage().instance().set(&DataKey::ContractWasm, &new_wasm_hash);
        
        env.events().publish(
            (symbol_short!("wasm_upd"),),
            (admin, new_wasm_hash)
        );
    }

    /// Transfer admin role (current admin only)
    pub fn transfer_admin(env: Env, current_admin: Address, new_admin: Address) {
        current_admin.require_auth();
        
        let stored_admin: Address = env.storage()
            .instance()
            .get(&DataKey::Admin)
            .expect("Factory not initialized");
        
        if current_admin != stored_admin {
            panic!("Only current admin can transfer admin role");
        }
        
        env.storage().instance().set(&DataKey::Admin, &new_admin);
        
        env.events().publish(
            (symbol_short!("adm_xfer"),),
            (current_admin, new_admin)
        );
    }
}