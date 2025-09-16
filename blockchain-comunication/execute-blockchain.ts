import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export type Network = "testnet" | "futurenet" | "mainnet";

/**
 * Run a Stellar CLI command
 */
async function runStellar(args: string): Promise<string> {
  try {
    const { stdout, stderr } = await execPromise(`stellar ${args}`);
    if (stderr) console.error("stderr:", stderr);
    return stdout.trim();
  } catch (err) {
    console.error("Error running Stellar CLI:", err);
    throw err;
  }
}

/* -------------------------------
   TYPES FOR FUNCTIONS
--------------------------------*/

export interface CreateOrganizationParams {
  wasmPath: string;
  source: string;
  orgId: string;
  name: string;
  network: Network;
}

export interface CreateBadgeParams {
  wasmPath: string;
  source: string;
  orgId: string;
  eventName: string;
  network: Network;
}

export interface MintBadgeParams {
  contractId: string;
  source: string;
  recipient: string;
  metadataUri: string;
  network: Network;
}

export interface GetBadgesFromWalletParams {
  contractId: string;
  owner: string;
  source: string;
  network: Network;
}

export interface GetEventsParams {
  contractId: string;
  orgId: string;
  source: string;
  network: Network;
}

/* -------------------------------
   FUNCTIONS
--------------------------------*/

/**
 * Create an organization (calls OrganizationContract.create_event_contract)
 */
export async function createOrganization(
  params: CreateOrganizationParams
): Promise<string> {
  const { wasmPath, source, orgId, name, network } = params;
  return runStellar(
    `contract invoke \
      --wasm ${wasmPath} \
      --source ${source} \
      --network ${network} \
      -- \
      create_event_contract \
      --org_id ${orgId} \
      --name "${name}"`
  );
}

/**
 * Create a badge (deploy EventContract)
 */
export async function createBadge(
  params: CreateBadgeParams
): Promise<string> {
  const { wasmPath, source, orgId, eventName, network } = params;
  return runStellar(
    `contract invoke \
      --wasm ${wasmPath} \
      --source ${source} \
      --network ${network} \
      -- \
      __constructor \
      --org_id ${orgId} \
      --event_name "${eventName}"`
  );
}

/**
 * Mint a badge (calls EventContract.mint_nft)
 */
export async function mintBadge(
  params: MintBadgeParams
): Promise<string> {
  const { contractId, source, recipient, metadataUri, network } = params;
  return runStellar(
    `contract invoke \
      --id ${contractId} \
      --source ${source} \
      --network ${network} \
      -- \
      mint_nft \
      --recipient ${recipient} \
      --metadata_uri "${metadataUri}"`
  );
}

/**
 * Return badges from a wallet (calls EventContract.get_owner_nfts)
 */
export async function getBadgesFromWallet(
  params: GetBadgesFromWalletParams
): Promise<string> {
  const { contractId, owner, source, network } = params;
  return runStellar(
    `contract invoke \
      --id ${contractId} \
      --source ${source} \
      --network ${network} \
      -- \
      get_owner_nfts \
      --owner ${owner}`
  );
}

/**
 * Return events from organization (calls OrganizationContract.get_org_events)
 */
export async function getEvents(
  params: GetEventsParams
): Promise<string> {
  const { contractId, orgId, source, network } = params;
  return runStellar(
    `contract invoke \
      --id ${contractId} \
      --source ${source} \
      --network ${network} \
      -- \
      get_org_events \
      --org_id ${orgId}`
  );
}
