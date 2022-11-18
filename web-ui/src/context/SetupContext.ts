import { createContext } from 'react';
import {
  EBackendProvider,
  IAccountsSetupParams,
  IAdditionalServices,
  IClusterParams,
  INetworkParams
} from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;
  networkParams: INetworkParams | null;
  clusterParams: IClusterParams | null;
  accountParams: IAccountsSetupParams | null;
  additionalServices: IAdditionalServices | null;

  setProvider(provider: EBackendProvider): void;

  setNetworkParams(params: INetworkParams): void;

  setClusterParams(params: IClusterParams): void;

  setAccountParams(params: IAccountsSetupParams): void;

  setAdditionalServices(params: IAdditionalServices): void;
}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  networkParams: null,
  clusterParams: null,
  additionalServices: null,
  accountParams: null,

  setProvider: (provider: EBackendProvider) => {},
  setNetworkParams(params: INetworkParams | null) {},
  setClusterParams(params: IClusterParams) {},
  setAdditionalServices(params: IAdditionalServices) {},
  setAccountParams(params: IAccountsSetupParams) {}
});

export default SetupContext;
