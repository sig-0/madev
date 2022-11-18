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
