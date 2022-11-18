import { createContext } from 'react';
import {
  EBackendProvider,
  IAdditionalServices,
  IClusterParams,
  INetworkParams
} from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;
  networkParams: INetworkParams | null;
  clusterParams: IClusterParams | null;
  additionalServices: IAdditionalServices | null;

  setProvider(provider: EBackendProvider): void;

  setNetworkParams(params: INetworkParams): void;

  setClusterParams(params: IClusterParams): void;

  setAdditionalServices(params: IAdditionalServices): void;
}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  networkParams: null,
  clusterParams: null,
  additionalServices: null,

  setProvider: (provider: EBackendProvider) => {},
  setNetworkParams(params: INetworkParams | null) {},
  setClusterParams(params: IClusterParams) {},
  setAdditionalServices(params: IAdditionalServices) {}
});

export default SetupContext;
