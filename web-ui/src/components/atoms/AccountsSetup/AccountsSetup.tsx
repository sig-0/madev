import { Box, TextField, Typography } from '@material-ui/core';
import { Wallet } from 'ethers';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { IAccountsSetupParams } from '../../../context/setupContext.types';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { ESetupStep, ISetupItemProps } from '../../pages/SetupPage/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import Counter from '../Counter/Counter';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import PageTitle from '../PageTitle/PageTitle';

const AccountsSetup: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const [numAccounts, setNumAccounts] = useState<number>(10);

  const [accounts, setAccounts] = useState<{ addresses: string[] }>({
    addresses: []
  });

  const [initialValues] = useState<IAccountsSetupParams>({
    mnemonic: '',
    accounts: []
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // TODO add validation schema
    onSubmit: (values, { resetForm }) => {
      next();
    }
  });

  const { openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formik.values.mnemonic != '') {
      setLoading(true);

      setTimeout(() => {
        const addresses: string[] = [];

        try {
          for (let i = 0; i < numAccounts; i++) {
            addresses.push(
              Wallet.fromMnemonic(formik.values.mnemonic, `m/44'/60'/0'/0/${i}`)
                .address
            );
          }

          setAccounts({ addresses: addresses });
        } catch (e) {
          openSnackbar('Invalid mnemonic provided', 'error');
        }

        setLoading(false);
      }, 1000);
    } else {
      setAccounts({ addresses: [] });
    }
  }, [formik.values.mnemonic, numAccounts]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={4}
      width={'100%'}
    >
      <PageTitle title={ESetupStep.ACCOUNTS_SETUP} />
      <form autoComplete={'off'} onSubmit={formik.handleSubmit}>
        <Box display={'flex'} flexDirection={'column'} maxWidth={'100%'} mt={4}>
          <Box display={'flex'} alignItems={'center'}>
            <TextField
              id={'mnemonic'}
              label={'Mnemonic'}
              variant={'outlined'}
              value={formik.values.mnemonic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mnemonic && Boolean(formik.errors.mnemonic)}
              helperText={formik.touched.mnemonic && formik.errors.mnemonic}
              style={{
                width: '500px'
              }}
            />
          </Box>
          <Box mt={4}>
            <Counter
              title={'Num. sub-accounts'}
              minimum={0}
              setValue={setNumAccounts}
              count={numAccounts}
            />
          </Box>
        </Box>

        {loading && (
          <Box mt={4}>
            <LoadingIndicator />
          </Box>
        )}

        {accounts.addresses.length > 0 && !loading && (
          <Box mt={4}>
            <Box
              ml={accounts.addresses.length * -2}
              display={'flex'}
              flexDirection={'column'}
              flexWrap={'wrap'}
              width={'300px'}
              height={'300px'}
            >
              {accounts.addresses.map((acc, index) => {
                return (
                  <Box key={index} mt={2} ml={2}>
                    <Typography>{acc}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        <Box width={'100%'} display={'flex'} mt={4} justifyContent={'center'}>
          <ActionButton text={'Next'} square={true} />
        </Box>
      </form>
    </Box>
  );
};

export default AccountsSetup;