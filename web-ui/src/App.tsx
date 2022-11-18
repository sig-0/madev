import MomentUtils from '@date-io/moment';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './App.css';
import { SnackbarProvider } from './components/molecules/Snackbar/snackbar.context';
import SetupContext, { ISetupContext } from './context/SetupContext';
import {
  EBackendProvider,
  IAccountsSetupParams,
  IAdditionalServices,
  IClusterParams,
  INetworkParams
} from './context/setupContext.types';
import AppRouter from './router/AppRouter';
import { globalStyles } from './shared/assets/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const [provider, setProvider] = useState<EBackendProvider>(
    EBackendProvider.POLYGON_EDGE
  );
  const [networkParams, setNetworkParams] = useState<INetworkParams | null>(
    null
  );
  const [clusterParams, setClusterParams] = useState<IClusterParams | null>(
    null
  );
  const [accountParams, setAccountParams] =
    useState<IAccountsSetupParams | null>(null);
  const [additionalServices, setAdditionalServices] =
    useState<IAdditionalServices | null>(null);

  const setupContext: ISetupContext = {
    provider,
    networkParams,
    clusterParams,
    accountParams,
    additionalServices,

    setProvider,
    setClusterParams,
    setNetworkParams,
    setAccountParams,
    setAdditionalServices
  };

  return (
    <SetupContext.Provider value={setupContext}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider>
          <ThemeProvider>
            <CssBaseline />
            <AppRouter />
          </ThemeProvider>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </SetupContext.Provider>
  );
}

export default withStyles(globalStyles)(App);
