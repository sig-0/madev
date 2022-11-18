import {ThemeProvider as MaterialThemeProvider} from '@material-ui/core/styles';
import React, {FC} from 'react';
import theme from './theme';

const ThemeProvider: FC = (props) => {

  return (
    <MaterialThemeProvider theme={theme}>
      {props.children}
    </MaterialThemeProvider>
  );
};

export default ThemeProvider;