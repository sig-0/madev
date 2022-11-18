import {createContext} from 'react';
import {EBackendProvider} from './setupContext.types';

export interface ISetupContext {
  provider: EBackendProvider;

  setProvider(provider: EBackendProvider): void;

}

const SetupContext = createContext<ISetupContext>({
  provider: EBackendProvider.POLYGON_EDGE,
  setProvider: (provider: EBackendProvider) => {
  }
});

export default SetupContext;