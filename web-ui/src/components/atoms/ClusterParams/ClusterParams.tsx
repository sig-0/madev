import { Box, IconButton, TextField, Typography } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { IClusterParams } from '../../../context/setupContext.types';
import { ESetupStep, ISetupItemProps } from '../../pages/SetupPage/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import PageTitle from '../PageTitle/PageTitle';

const ClusterParams: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const [nodes, setNodes] = useState<number>(4);

  const handleDecrease = () => {
    if (nodes > 1) {
      setNodes(nodes - 1);
    }
  };

  const handleIncrease = () => {
    setNodes(nodes + 1);
  };

  const [initialValues] = useState<IClusterParams>({
    numNodes: nodes,
    jsonRPCPort: 8545
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // TODO add validation schema
    onSubmit: (values, { resetForm }) => {
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
          <Box display={'flex'} alignItems={'center'}>
            <Typography>Num. nodes</Typography>
            <Box ml={2} display={'flex'} alignItems={'center'}>
              <IconButton color={'primary'} onClick={() => handleDecrease()}>
                <RemoveRoundedIcon />
              </IconButton>
              <Typography>{nodes}</Typography>
              <IconButton color={'primary'} onClick={() => handleIncrease()}>
                <AddRoundedIcon />
              </IconButton>
            </Box>
          </Box>
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
