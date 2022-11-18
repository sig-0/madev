import {
  IconButton,
  makeStyles,
  Snackbar as MUISnackbar,
  Typography
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { FC } from 'react';
import { SnackbarConsumer } from './snackbar.context';
import { ISnackbarContext, ISnackbarProps } from './snackbar.types';

const Snackbar: FC = () => {
  const classes = useStyles();
  const handleClose =
    (
      key: ISnackbarProps['key'],
      closeCallback: ISnackbarContext['closeSnackbar']
    ) =>
    (event?: React.SyntheticEvent, reason?: string) => {
      // Prevent closing Toast on click away
      if (reason === 'clickaway') {
        return;
      }
      closeCallback(key);
    };

  return (
    <SnackbarConsumer>
      {({ snackbars, closeSnackbar }) =>
        snackbars.map((snackbar) => (
          <MUISnackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={snackbar.isOpen}
            autoHideDuration={6000}
            onClose={handleClose(snackbar.key, closeSnackbar)}
            key={snackbar.key}
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={handleClose(snackbar.key, closeSnackbar)}
              >
                <Close />
              </IconButton>
            ]}
            classes={{
              root: classes.snackbarRoot
            }}
          >
            <Alert
              onClose={handleClose(snackbar.key, closeSnackbar)}
              severity={snackbar.severity}
              classes={{
                root: classes.snackbarRoot
              }}
            >
              <Typography>{snackbar.message}</Typography>
            </Alert>
          </MUISnackbar>
        ))
      }
    </SnackbarConsumer>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    snackbarRoot: {
      fontFamily: 'Poppins'
    }
  };
});

export default Snackbar;