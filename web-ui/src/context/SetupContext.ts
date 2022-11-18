import { createContext } from 'react';
import {
  EBackendProvider,
  IAccountsSetupParams,
  IAdditionalServices,
  IClusterParams,
  IContractStorage,
  INetworkParams
} from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;
  networkParams: INetworkParams | null;
  clusterParams: IClusterParams | null;
  accountParams: IAccountsSetupParams | null;
  additionalServices: IAdditionalServices | null;
  contracts: IContractStorage | null;

  setProvider(provider: EBackendProvider): void;

  setNetworkParams(params: INetworkParams): void;

  setClusterParams(params: IClusterParams): void;

  setAccountParams(params: IAccountsSetupParams): void;

  setAdditionalServices(params: IAdditionalServices): void;

  setContracts(contracts: IContractStorage): void;
}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  networkParams: null,
  clusterParams: null,
  additionalServices: null,
  accountParams: null,
  contracts: null,

  setProvider: (provider: EBackendProvider) => {},
  setNetworkParams(params: INetworkParams | null) {},
  setClusterParams(params: IClusterParams) {},
  setAdditionalServices(params: IAdditionalServices) {},
  setAccountParams(params: IAccountsSetupParams) {},
  setContracts(params: IContractStorage) {}
});

export default SetupContext;
