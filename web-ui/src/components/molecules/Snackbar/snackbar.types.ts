import { AlertProps } from '@material-ui/lab';

export interface ISnackbarContext {
  openSnackbar: (message: string, severity: ISnackbarProps['severity']) => void;
  closeSnackbar: (key: ISnackbarProps['key']) => void;
  snackbars: ISnackbarProps[];
}

export interface ISnackbarProps {
  message: string;
  isOpen: boolean;
  key: number | string;
  severity: AlertProps['severity'];
}