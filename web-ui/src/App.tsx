import MomentUtils from '@date-io/moment';
import {CssBaseline} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {withStyles} from '@material-ui/styles';
import React from 'react';
import './App.css';
import {SnackbarProvider} from './components/molecules/Snackbar/snackbar.context';
import AppRouter from './router/AppRouter';
import {globalStyles} from './shared/assets/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <SnackbarProvider>
        <ThemeProvider>
          <CssBaseline/>
          <AppRouter/>
        </ThemeProvider>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  );
}

export default withStyles(globalStyles)(App);
