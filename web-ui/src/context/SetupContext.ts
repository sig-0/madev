import { createContext } from 'react';
import { EBackendProvider, INetworkParams } from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;
  networkParams: INetworkParams | null;

  setProvider(provider: EBackendProvider): void;

  setNetworkParams(params: INetworkParams | null): void;
}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  networkParams: null,

  setProvider: (provider: EBackendProvider) => {},

  setNetworkParams(params: INetworkParams | null) {}
});

export default SetupContext;
