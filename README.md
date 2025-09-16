# Proofly

Reputação on-chain para devs: badges NFTs soulbound que provam experiência real.

## 🚀 Ideias Gerais
⚡ Contratar dev blockchain é lento e incerto. Credenciais ficam espalhadas e são difíceis de auditar.  
🛡️ Proofly unifica comunidade, cursos, eventos e gigs; cada conquista vira um NFT, intransferível em Soroban/Stellar.  
🔍 Empresas filtram por provas verificáveis; devs acumulam reputação antifraude.

## 💎 Destaques Únicos
- 🛡️ NFTs com regras no contrato (intransferível; emissão controlada).
- 🔍 Reputação on-chain consultável (eventos do contrato + consultas).
- ⚡ Incentivos via badges (acessos, descontos) que geram engajamento.

## 🎯 Para Quem?
- Devs que desejam aprender, participar, entregar, provar — perfil on-chain.
- Empresas: filtros por provas reais e menos risco na contratação.

## ⚙️ Como Funciona?
1) Conquista: organização cria evento/contrato (OrganizationContract.create_event_contract → EventContract.__constructor).  
2) Cunha: emissor chama mint_nft(recipient, metadata_uri) → SBT na carteira do dev.  
3) Prova: empresas/leads consultam get_owner_nfts e get_org_events para validar.

## 📈 Modelo de Negócio
- Taxa de Evento
- Assinatura de Empresas
- Comissões durante a contratação

## 🔮 Próximos Passos
- MVP + testes de carga e auditoria dos contratos.  
- Indexador de eventos para busca avançada e scoring de reputação.

## 🛠️ Tech Stack
- Blockchain: Stellar Soroban, Stellar CLI/SDK
- Backend: Node.js + TypeScript (wrapper CLI)
- Frontend: Next.js/React
- Infra: Linux, PNPM

## 👥 Time
- Állan Rocha
- Cairê Belo  
- Luís Ávila
- Gabriel Alex

---

Notas técnicas:
- Blockchain wrapper: blockchain-comunication/execute-blockchain.ts usa child_process para chamar “stellar contract invoke”, com a rede testnet.
- Operações expostas:
  - createOrganization → create_event_contract (wasm)
  - createBadge → __constructor (wasm)
  - mintBadge → mint_nft --recipient --metadata_uri (id)
  - getBadgesFromWallet → get_owner_nfts (id)
  - getEvents → get_org_events (id)
- Segurança: transações assinadas via --source; NFTs intransferíveis por regra de contrato; metadata_uri imutável para verificação externa.