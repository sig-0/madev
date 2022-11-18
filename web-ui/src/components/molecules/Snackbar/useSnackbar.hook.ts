import { useContext } from 'react';
import { SnackbarContext } from './snackbar.context';

const useSnackbar = () => useContext(SnackbarContext);

export default useSnackbar;