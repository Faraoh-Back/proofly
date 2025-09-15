import * as StellarSdk from '@stellar/stellar-sdk';

const {
  Keypair,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Contract,
  Address,
  xdr,
  scValToNative,
  SorobanRpc
} = StellarSdk;

const server = new StellarSdk.rpc.Server('https://soroban-testnet.stellar.org');

// Você precisa definir estas constantes
const NFT_CONTRACT_ID = "CCXSLIQAOPT3MADV3SMYIUSMUS7WYPGOPQA662F4P6WBHD4ZQMRMYSHY"; // Substitua pelo ID do seu contrato NFT

const adminSecretKey = 'SD3I7RGOVXIDVZN6OQKSWRMGW5Y53QICENHD37KXLOAW45NDPGUT7RAK'; // Cole a chave secreta que começa com 'S...'
const keypair = Keypair.fromSecret(adminSecretKey);
const publicKey = keypair.publicKey();

/**
 * Função ADICIONADA para inicializar o contrato.
 * O contrato NFT precisa que o admin seja definido uma única vez.
 */
async function initializeContract(adminAddress) {
  console.log("Verificando se o contrato precisa ser inicializado...");
  const contract = new Contract(NFT_CONTRACT_ID);
  
  // Para evitar pânico, podemos verificar primeiro se já foi inicializado.
  // No entanto, para um script de teste simples, vamos chamar diretamente.
  // Se já foi inicializado, a transação falhará, o que é esperado nas execuções subsequentes.
  try {
    const account = await server.getAccount(publicKey);
    const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET
      })
      .addOperation(
        contract.call('initialize', new Address(adminAddress).toScVal())
      )
      .setTimeout(300)
      .build();

    tx.sign(keypair);
    const sendTxResponse = await server.sendTransaction(tx);
    
    // Esperar a transação ser confirmada
    let txResponse = await server.getTransaction(sendTxResponse.hash);
    let maxRetries = 20;
    while (txResponse.status === 'PENDING' && maxRetries > 0) {
        console.log("Aguardando confirmação da transação de inicialização...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        txResponse = await server.getTransaction(sendTxResponse.hash);
        maxRetries--;
    }

    if (txResponse.status !== 'SUCCESS') {
        console.warn("Falha ao inicializar o contrato (pode já ter sido inicializado):", txResponse);
    } else {
        console.log("Contrato inicializado com sucesso!", txResponse);
    }
    
  } catch (error) {
     console.warn("Não foi possível inicializar o contrato. Motivo provável: já inicializado.", error.message);
  }
}

async function mintNFT(toAddress, tokenId, metadata) {
  const contract = new Contract(NFT_CONTRACT_ID);

  try {
    const account = await server.getAccount(publicKey);

    // Criar a transação para chamar a função de mint no contrato
    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(
      contract.call(
        'mint',
        xdr.ScVal.scvAddress(
          xdr.ScAddress.scAddressTypeAccount(
            xdr.PublicKey.publicKeyTypeEd25519(
              StellarSdk.StrKey.decodeEd25519PublicKey(toAddress)
            )
          )
        ),
        xdr.ScVal.scvU32(tokenId),
        xdr.ScVal.scvMap([
          new xdr.ScMapEntry({
            key: xdr.ScVal.scvSymbol('name'),
            val: xdr.ScVal.scvString(metadata.name)
          }),
          new xdr.ScMapEntry({
            key: xdr.ScVal.scvSymbol('symbol'),
            val: xdr.ScVal.scvString(metadata.symbol)
          }),
          new xdr.ScMapEntry({
            key: xdr.ScVal.scvSymbol('uri'),
            val: xdr.ScVal.scvString(metadata.uri)
          })
        ])
      )
    )
    .setTimeout(300)
    .build();

    // Assinar e enviar a transação
    tx.sign(keypair);
    const result = await server.sendTransaction(tx);

    console.log(`NFT #${tokenId} mintado com sucesso para ${toAddress}`);
    return result;
  } catch (error) {
    console.error("Erro ao mintar NFT:", error);
    throw error;
  }
}

// Função para financiar a conta no testnet
async function fundAccount(publicKey) {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${publicKey}`
    );
    const responseJSON = await response.json();
    console.log("Conta financiada com sucesso:", responseJSON);
  } catch (e) {
    console.error("Erro ao financiar conta:", e);
  }
}

// Suas funções NFT aqui (com algumas correções)
async function transferNFT(fromAddress, toAddress, tokenId) {
  const contract = new Contract(NFT_CONTRACT_ID);
  const account = await server.getAccount(fromAddress);
  
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

  try {
    // Obter a conta correspondente ao publicKey
    const account = await server.getAccount(publicKey);

    // Decodificar o endereço do proprietário (ownerAddress) para o formato esperado
    const scAddress = xdr.ScAddress.scAddressTypeAccount(
      xdr.PublicKey.publicKeyTypeEd25519(
        StellarSdk.StrKey.decodeEd25519PublicKey(ownerAddress) // Decodificar chave pública base32
      )
    );

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
    .addOperation(
      contract.call(
        'balance_of',
        xdr.ScVal.scvAddress(scAddress) // Passar o ScAddress correto
      )
    )
    .setTimeout(300)
    .build();

    // Simular a transação (não precisa assinar para consultas)
    const simulated = await server.simulateTransaction(tx);
    if (simulated.result && simulated.result.retval) {
      const balance = scValToNative(simulated.result.retval);
      return balance;
    } else {
      throw new Error("Simulação não retornou resultado esperado");
    }

    return result;
  } catch (error) {
    console.error("Erro ao consultar NFTs:", error);
    throw error;
  }
}

async function listarTodosNFTsDeUsuario(userAddress) {
  // 1. Chamar a nova função do contrato para obter os IDs dos tokens
  const tokenIdsResponse = await server.invoke(
      contract.call('tokens_of_owner', new Address(userAddress).toScVal())
  );
  const tokenIds = scValToNative(tokenIdsResponse.retval); // Será um array de números, ex: [5, 42, 101]

  // 2. Buscar os metadados para cada ID
  const nfts = [];
  for (const id of tokenIds) {
    const metadata = await getTokenMetadata(id);
    if (metadata) {
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

async function runTests() {
  console.log("Iniciando testes...");
  console.log("Public Key:", publicKey);

  // 1. Financiar a conta
  console.log("\n1. Financiando conta no testnet...");
  await fundAccount(publicKey);

  // 2. Inicializar o contrato
  console.log("\n2. Inicializando o contrato...");
  await initializeContract(publicKey);

  // 3. Mintar um novo NFT
  console.log("\n3. Mintando um novo NFT...");
  const tokenId = 1; // ID do token a ser mintado
  const metadata = {
    name: "NFT de Teste",
    symbol: "TEST",
    uri: "https://example.com/nft/1"
  };

  try {
    await mintNFT(publicKey, tokenId, metadata);
  } catch (error) {
    console.error("Erro ao mintar NFT:", error);
  }

  // 4. Consultar NFTs
  console.log("\n4. Consultando NFTs...");
  try {
    const balance = await consultarNFTs(publicKey);
    console.log("Saldo de NFTs:", balance);
  } catch (error) {
    console.error("Erro ao consultar NFTs:", error);
  }

  // 5. Buscar metadata do token mintado
  console.log("\n5. Buscando metadata do token #1...");
  try {
    const metadata = await getTokenMetadata(1);
    console.log("Metadata do token #1:", metadata);
  } catch (error) {
    console.error("Erro ao buscar metadata:", error);
  }
}

// Executar os testes
runTests().catch(console.error);