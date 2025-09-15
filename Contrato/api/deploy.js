import { 
  Keypair, 
  SorobanRpc, 
  TransactionBuilder, 
  BASE_FEE,
  Networks,
  Operation,
  Asset
} from '@stellar/stellar-sdk';
import fs from 'fs';

export default async function handler(req, res) {
  try {
    // Configuração do servidor RPC
    const server = new SorobanRpc.Server(
      'https://soroban-testnet.stellar.org'
    );
    
    // Carregue sua chave secreta (use variáveis de ambiente!)
    const sourceKeypair = Keypair.fromSecret(
      process.env.STELLAR_SECRET_KEY
    );
    
    // Leia o arquivo WASM compilado
    const contractWasm = fs.readFileSync(
      './contracts/target/wasm32-unknown-unknown/release/meu_contrato.wasm'
    );
    
    // Crie a transação de upload
    const account = await server.getAccount(sourceKeypair.publicKey());
    
    const uploadTx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(
      Operation.uploadContractWasm({
        wasm: contractWasm
      })
    )
    .setTimeout(300)
    .build();
    
    // Assine e envie
    uploadTx.sign(sourceKeypair);
    const uploadResult = await server.sendTransaction(uploadTx);
    
    res.status(200).json({ 
      success: true, 
      wasmHash: uploadResult.hash 
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
}