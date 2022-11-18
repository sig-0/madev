import React, { createContext, FC, useCallback, useState } from 'react';
import Snackbar from './Snackbar';
import { Box } from '@material-ui/core';
import { ISnackbarContext, ISnackbarProps } from './snackbar.types';

export const SnackbarContext = createContext<ISnackbarContext>({
  openSnackbar: () => {},
  closeSnackbar: () => {},
  snackbars: []
});

export const SnackbarProvider: FC = ({ children }) => {
  const [snackbars, setSnackbars] = useState<ISnackbarProps[]>([]);

  const openSnackbar = useCallback((message: string, severity: ISnackbarProps['severity']) => {
    const newSnackbar: ISnackbarProps = {
      message,
      isOpen: true,
      key: new Date().getTime(),
      severity
    };

    setSnackbars([
      newSnackbar,
      ...snackbars
    ]);
  }, []);

  const closeSnackbar = useCallback((key: ISnackbarProps['key']) => {
    setSnackbars((prevState) => (
      prevState.filter(snackbar => (
        snackbar.key !== key
      ))
    ))
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        closeSnackbar,
        snackbars
      }}
    >
      <Box display='flex' position='fixed' bottom='8px' left='8px' zIndex={1400} flexDirection='column'>
        <Snackbar/>
      </Box>
      {children}
    </SnackbarContext.Provider>
  )
};

export const SnackbarConsumer = SnackbarContext.Consumer;