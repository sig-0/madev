import { createContext } from 'react';
import {
  EBackendProvider,
  IClusterParams,
  INetworkParams
} from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;
  networkParams: INetworkParams | null;
  clusterParams: IClusterParams | null;

  setProvider(provider: EBackendProvider): void;

  setNetworkParams(params: INetworkParams): void;

  setClusterParams(params: IClusterParams): void;
}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  networkParams: null,
  clusterParams: null,

  setProvider: (provider: EBackendProvider) => {},
  setNetworkParams(params: INetworkParams | null) {},
  setClusterParams(params: IClusterParams) {}
});

export default SetupContext;
