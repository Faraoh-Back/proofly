import '@stellar/stellar-sdk';

const server = new SorobanRpc.Server(
  'https://soroban-testnet.stellar.org'
);
  

// Exemplo de transferência de NFT
async function transferNFT(toAddress, tokenId) {
  const contract = new Contract(NFT_CONTRACT_ID);
  
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
  .addOperation(
    contract.call(
      'transfer',
      xdr.ScVal.scvAddress(Address.fromString(fromAddress).toScVal()),
      xdr.ScVal.scvAddress(Address.fromString(toAddress).toScVal()),
      xdr.ScVal.scvU32(tokenId)
    )
  )
  .setTimeout(300)
  .build();
  
  // Assinar e enviar transação
  tx.sign(keypair);
  const result = await server.sendTransaction(tx);
  
  return result;
}

// Qualquer pessoa pode chamar esta função
async function consultarNFTs(ownerAddress) {
  const contract = new Contract(NFT_CONTRACT_ID);
  
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
  .addOperation(
    contract.call(
      'balance_of',
      xdr.ScVal.scvAddress(Address.fromString(ownerAddress).toScVal())
    )
  )
  .setTimeout(300)
  .build();
  
  // Simular a transação (não precisa assinar para consultas)
  const simulated = await server.simulateTransaction(tx);
  const result = simulated.result;
  
  return result;
}

// Qualquer pessoa pode executar isso
async function listarTodosNFTsDeUsuario(userAddress) {
  // Consultar saldo
  const balance = await consultarNFTs(userAddress);
  
  // Consultar cada NFT
  const nfts = [];
  for (let i = 0; i < balance; i++) {
    const metadata = await getTokenMetadata(i);
    if (metadata.owner === userAddress) {
      nfts.push(metadata);
    }
  }
  
  console.log(`Usuário ${userAddress} possui ${nfts.length} NFTs:`);
  nfts.forEach(nft => {
    console.log(`- Token #${nft.token_id}: ${nft.name}`);
  });
  
  return nfts;
}

async function getTokenMetadata(tokenId) {
  const contract = new Contract(NFT_CONTRACT_ID);
  
  // Criar a transação para chamar a função do contrato
  const account = await server.getAccount(somePublicKey);
  
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
  .addOperation(
    contract.call(
      'get_token_metadata',  // Nome da função no contrato Rust
      xdr.ScVal.scvU32(tokenId)  // Parâmetro token_id
    )
  )
  .setTimeout(300)
  .build();
  
  // Para consultas, apenas simulamos (não precisamos assinar)
  const simulated = await server.simulateTransaction(tx);
  
  // Extrair o resultado da simulação
  if (simulated.result) {
    // Decodificar o resultado para JavaScript
    const metadata = scValToNative(simulated.result.retval);
    
    return {
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      owner: metadata.owner,
      token_id: metadata.token_id
    };
  }
  
  throw new Error('Falha ao buscar metadados do token');
}

async function getTokenMetadataSimplificado(tokenId) {
  try {
    // Chamar diretamente a função view do contrato
    const result = await contract.get_token_metadata({
      token_id: tokenId
    });
    
    // O resultado já vem decodificado
    return {
      name: result.name,
      symbol: result.symbol, 
      uri: result.uri,
      owner: result.owner,
      token_id: result.token_id
    };
    
  } catch (error) {
    console.error('Erro ao buscar metadados:', error);
    return null;
  }
}

// Teste