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

// IDs dos contratos (substitua pelos reais)
const ORG_CONTRACT_ID = "CCNL4TJGMB4EUEL44XTP6NOVMJNHNRJN7JAUWN2EOW4GYZ7ULLAZ5PS5";
const EVENT_CONTRACT_ID = "CAJCWVB3XASHNMD4NIRG76PPDJQ5MPGE7N2XODMKTJVJJLIRBX34NLVX";

// Chave do admin (substitua pela real)
const adminSecretKey = 'SD3I7RGOVXIDVZN6OQKSWRMGW5Y53QICENHD37KXLOAW45NDPGUT7RAK';
const keypair = Keypair.fromSecret(adminSecretKey);
const publicKey = keypair.publicKey();

// --- AUXILIARES ---

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

// Inicializa o contrato Organization se necessário
async function initializeOrganizationContract(companyAddress) {
  const contract = new Contract(ORG_CONTRACT_ID);
  try {
    const account = await server.getAccount(publicKey);
    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET
    })
      .addOperation(
        contract.call(
          '__constructor',
          new Address(companyAddress).toScVal()
        )
      )
      .setTimeout(300)
      .build();

    tx.sign(keypair);
    const sendTxResponse = await server.sendTransaction(tx);

    // Esperar confirmação
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
      console.log("Contrato Organization inicializado com sucesso!", txResponse);
    }
  } catch (error) {
    console.warn("Não foi possível inicializar o contrato Organization. Motivo provável: já inicializado.", error.message);
  }
}

// --- ORGANIZATION CONTRACT ---

// Cria uma nova organização e um contrato de evento
async function criarOrganizacao(orgId, nome, eventWasmHash) {
  const contract = new Contract(ORG_CONTRACT_ID);
  const account = await server.getAccount(publicKey);

  // Tenta inicializar o contrato antes de criar organização
  await initializeOrganizationContract(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'create_event_contract',
        xdr.ScVal.scvBytes(orgId), // org_id: Bytes
        xdr.ScVal.scvString(nome), // name: String
        xdr.ScVal.scvBytes(eventWasmHash) // event_contract_wasm_hash: BytesN<32>
      )
    )
    .setTimeout(300)
    .build();

  tx.sign(keypair);
  const result = await server.sendTransaction(tx);
  if (result.status === 'ERROR' && result.hash) {
    // Busca detalhes do erro usando o hash da transação
    const txDetails = await server.getTransaction(result.hash);
    console.error('Detalhes do erro:', txDetails);
  }
  
  return result;
}

// Consulta dados de uma organização
async function consultarOrganizacao(orgId) {
  const contract = new Contract(ORG_CONTRACT_ID);
  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'get_org_events',
        xdr.ScVal.scvBytes(orgId)
      )
    )
    .setTimeout(300)
    .build();

  const simulated = await server.simulateTransaction(tx);
  if (simulated.result && simulated.result.retval) {
    return scValToNative(simulated.result.retval);
  }
  return null;
}

// --- EVENT CONTRACT ---

// Mintar um novo NFT para um participante
async function mintarNFT(eventContractId, destinatario, metadataUri, atributos) {
  const contract = new Contract(eventContractId);
  const account = await server.getAccount(publicKey);

  // atributos: { chave: valor, ... }
  const attrMap = Object.entries(atributos).map(([k, v]) =>
    new xdr.ScMapEntry({
      key: xdr.ScVal.scvString(k),
      val: xdr.ScVal.scvString(v)
    })
  );

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'mint_nft',
        new Address(destinatario).toScVal(),
        xdr.ScVal.scvString(metadataUri),
        xdr.ScVal.scvMap(attrMap)
      )
    )
    .setTimeout(300)
    .build();

  tx.sign(keypair);
  const result = await server.sendTransaction(tx);
  return result;
}

// Consulta detalhes de um NFT
async function consultarNFT(eventContractId, tokenId) {
  const contract = new Contract(eventContractId);
  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'get_nft',
        xdr.ScVal.scvU32(tokenId)
      )
    )
    .setTimeout(300)
    .build();

  const simulated = await server.simulateTransaction(tx);
  if (simulated.result && simulated.result.retval) {
    return scValToNative(simulated.result.retval);
  }
  return null;
}

// Lista todos os NFTs de um usuário
async function listarNFTsUsuario(eventContractId, userAddress) {
  const contract = new Contract(eventContractId);
  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
  })
    .addOperation(
      contract.call(
        'get_owner_nfts',
        new Address(userAddress).toScVal()
      )
    )
    .setTimeout(300)
    .build();

  const simulated = await server.simulateTransaction(tx);
  if (simulated.result && simulated.result.retval) {
    return scValToNative(simulated.result.retval);
  }
  return [];
}

// --- TESTES SIMPLES ---

async function runTests() {
  console.log("Iniciando testes Organization/Event...");

  // 0. Financiar a conta no testnet
  await fundAccount(publicKey);

  // 1. Criar organização (orgId = 32 bytes aleatórios)
  const orgId = StellarSdk.StrKey.encodeEd25519PublicKey(StellarSdk.Keypair.random().publicKey()).slice(0, 32);
  const nome = "Organização de Teste!";
  const eventWasmHash = new Uint8Array(32); // Substitua pelo hash real do WASM

  console.log("Criando organização...");
  try {
    let result = await criarOrganizacao(orgId, nome, eventWasmHash);
    console.log("Organização criada!");
    console.log(result);
  } catch (e) {
    console.error("Erro ao criar organização:", e);
  }

  return 0;

  // 2. Consultar organização
  console.log("Consultando organização...");
  try {
    const org = await consultarOrganizacao(orgId);
    console.log("Organização:", org);
  } catch (e) {
    console.error("Erro ao consultar organização:", e);
  }

  // 3. Mintar NFT no contrato de evento (use o event_contract_id retornado)
  const eventContractId = EVENT_CONTRACT_ID; // Substitua pelo endereço correto
  const destinatario = publicKey;
  const metadataUri = "https://meusite.com/nft/1";
  const atributos = { tipo: "certificado", nivel: "ouro" };

  console.log("Mintando NFT...");
  try {
    await mintarNFT(eventContractId, destinatario, metadataUri, atributos);
    console.log("NFT mintado!");
  } catch (e) {
    console.error("Erro ao mintar NFT:", e);
  }

  // 4. Consultar NFT
  console.log("Consultando NFT...");
  try {
    const nft = await consultarNFT(eventContractId, 1);
    console.log("NFT:", nft);
  } catch (e) {
    console.error("Erro ao consultar NFT:", e);
  }

  // 5. Listar NFTs do usuário
  console.log("Listando NFTs do usuário...");
  try {
    const nfts = await listarNFTsUsuario(eventContractId, destinatario);
    console.log("NFTs do usuário:", nfts);
  } catch (e) {
    console.error("Erro ao listar NFTs:", e);
  }
}

// Descomente para rodar os testes
runTests().catch(console.error);

export {
  criarOrganizacao,
  consultarOrganizacao,
  mintarNFT,
  consultarNFT,
  listarNFTsUsuario,
  fundAccount,
  initializeOrganizationContract
};