import { Box, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { FC, useContext, useState } from 'react';
import SetupContext from '../../../context/SetupContext';
import { IClusterParams } from '../../../context/setupContext.types';
import { ESetupStep, ISetupItemProps } from '../../pages/SetupPage/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import Counter from '../Counter/Counter';
import PageTitle from '../PageTitle/PageTitle';

const ClusterParams: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const { setClusterParams } = useContext(SetupContext);

  const [nodes, setNodes] = useState<number>(4);

  const [initialValues] = useState<IClusterParams>({
    numNodes: nodes,
    jsonRPCPort: 8545
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // TODO add validation schema
    onSubmit: (values, { resetForm }) => {
      setClusterParams({
        numNodes: nodes,
        jsonRPCPort: values.jsonRPCPort
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
        <Box display={'flex'} flexDirection={'column'} maxWidth={'100%'} mt={4}>
          <Counter
            title={'Num. nodes'}
            minimum={1}
            setValue={setNodes}
            count={nodes}
          />
          <Box display={'flex'} alignItems={'center'} mt={6}>
            <Box mr={1}>
              <Typography>127.0.0.1/</Typography>
            </Box>
            <TextField
              id={'jsonRPCPort'}
              label={'JSON-RPC Port'}
              variant={'outlined'}
              value={formik.values.jsonRPCPort}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.jsonRPCPort && Boolean(formik.errors.jsonRPCPort)
              }
              helperText={
                formik.touched.jsonRPCPort && formik.errors.jsonRPCPort
              }
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

export default ClusterParams;
