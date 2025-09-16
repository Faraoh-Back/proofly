import { Keypair } from '@stellar/stellar-sdk';

// Use o Friendbot para receber XLM de teste
async function createTestAccount(publicKey) {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${publicKey}`
  );
  return response.json();
}

// Gerar um novo par de chaves
const pair = Keypair.random();

console.log('Chave Pública (Endereço):', pair.publicKey());
// Exemplo: GBVJSCMZ7LY5I7AQT3BFNUB2LZLK5K5WT3YJVC7QJJCY3JZVOORSQOWQ

console.log('Chave Secreta:', pair.secret());
// Exemplo: SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4

// Exemplo de uso
await createTestAccount(pair.publicKey());