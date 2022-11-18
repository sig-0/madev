export enum EBackendProvider {
  POLYGON_EDGE = 'Polygon Edge',
  GETH = 'Geth',
  AVALANCHE = 'Avalanche'
}

export interface INetworkParams {
  gasLimit: number;
  gasPrice: number;
  chainID: number;
  blockTime: number;
}

export interface IClusterParams {
  numNodes: number;
  jsonRPCPort: number;
}

export interface IAccountsSetupParams {
  mnemonic: string;
  accounts: string[];
}

export enum EAdditionalService {
  BLOCKSCOUT = 'Blockscout',
  ETHERSCAN = 'Etherscan',
  THE_GRAPH = 'The Graph',
  NEW_RELIC = 'New Relic'
}

export interface IAdditionalServices {
  services: EAdditionalService[];
}
