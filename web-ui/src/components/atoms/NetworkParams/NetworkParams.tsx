import { Box, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { FC, useContext, useState } from 'react';
import SetupContext from '../../../context/SetupContext';
import { INetworkParams } from '../../../context/setupContext.types';
import { ESetupStep, ISetupItemProps } from '../../pages/Setup/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import PageTitle from '../PageTitle/PageTitle';

const NetworkParams: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const { setNetworkParams } = useContext(SetupContext);

  const [initialValues] = useState<INetworkParams>({
    gasLimit: 5242880,
    gasPrice: 0,
    chainID: 100,
    blockTime: 1
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // TODO add validation schema
    onSubmit: (values, { resetForm }) => {
      setNetworkParams({
        gasLimit: values.gasLimit,
        gasPrice: values.gasPrice,
        chainID: values.chainID,
        blockTime: values.blockTime
      });

      next();
    }
  });

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={4}
      width={'100%'}
    >
      <PageTitle title={ESetupStep.NETWORK_PARAMS} />
      <form autoComplete={'off'} onSubmit={formik.handleSubmit}>
        <Box display={'flex'} maxWidth={'100%'} mt={4}>
          <Box display={'flex'} alignItems={'center'}>
            <Box display={'flex'} mr={4}>
              <TextField
                id={'gasLimit'}
                label={'Gas Limit'}
                variant={'outlined'}
                value={formik.values.gasLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.gasLimit && Boolean(formik.errors.gasLimit)
                }
                helperText={formik.touched.gasLimit && formik.errors.gasLimit}
                style={{
                  width: '300px'
                }}
              />
            </Box>
            <TextField
              id={'gasPrice'}
              label={'Gas Price'}
              variant={'outlined'}
              value={formik.values.gasPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gasPrice && Boolean(formik.errors.gasPrice)}
              helperText={formik.touched.gasPrice && formik.errors.gasPrice}
              style={{
                width: '300px'
              }}
            />
          </Box>
        </Box>

        <Box display={'flex'} maxWidth={'100%'} mt={4}>
          <Box display={'flex'} alignItems={'center'}>
            <Box display={'flex'} mr={4}>
              <TextField
                id={'chainID'}
                label={'Chain ID'}
                variant={'outlined'}
                value={formik.values.chainID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.chainID && Boolean(formik.errors.chainID)}
                helperText={formik.touched.chainID && formik.errors.chainID}
                style={{
                  width: '300px'
                }}
              />
            </Box>
            <TextField
              id={'blockTime'}
              label={'Block Time'}
              variant={'outlined'}
              value={formik.values.blockTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.blockTime && Boolean(formik.errors.blockTime)
              }
              helperText={formik.touched.blockTime && formik.errors.blockTime}
              style={{
                width: '300px'
              }}
            />
          </Box>
        </Box>
        <Box width={'100%'} display={'flex'} mt={4} justifyContent={'center'}>
          <ActionButton text={'Next'} square={true} />
        </Box>
      </form>
    </Box>
  );
};

export default NetworkParams;
