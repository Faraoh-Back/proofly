#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, symbol_short};

#[contract]
pub struct MeuContrato;

#[contractimpl]
impl MeuContrato {
    pub fn hello(env: Env, to: Symbol) -> Symbol {
        env.storage().instance().set(&symbol_short!("name"), &to);
        symbol_short!("hello")
    }
}