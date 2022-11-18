import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import { Contract, ContractFactory, ethers, Wallet } from 'ethers';
import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import SetupContext from '../../../context/SetupContext';
import theme from '../../../theme/theme';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import FormTitle from '../../atoms/FormTitle/FormTitle';
import PageTitle from '../../atoms/PageTitle/PageTitle';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { INewContractProps } from './newContract.types';

const NewContract: FC<INewContractProps> = () => {
  const { accountParams, contracts, setContracts } = useContext(SetupContext);

  const classes = useStyles();

  const [selectedAccount, setSelectedAccount] = useState<number>(0);

  const dropzoneStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    height: '100%',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const deployContract = async (abi: any, bytecode: any): Promise<Contract> => {
    const contractFactory = new ContractFactory(
      abi,
      bytecode,
      Wallet.fromMnemonic(
        accountParams != null ? accountParams.mnemonic : '',
        `m/44'/60'/0'/0/${selectedAccount}`
      ).connect(new ethers.providers.JsonRpcProvider('http://127.0.0.1:10000'))
    );

    const contract = await contractFactory.deploy();

    await contract.deployTransaction.wait();

    return contract;
  };

  const [contract, setContract] = useState<any>();

  const { openSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const executeDeployment = () => {
    const abi = contract.abi;
    const bytecode = contract.bytecode;

    deployContract(abi, bytecode)
      .then((contract) => {
        if (contracts == null) {
          console.log('No contracts initialized');

          return;
        }

        const ctrx: Contract[] = contracts.contracts;
        ctrx.push(contract);

        setContracts({
          contracts: ctrx
        });

        navigate('/contracts');
        openSnackbar('Contract successfully deployed', 'success');
      })
      .catch((e) => {
        openSnackbar('Unable to deploy contract', 'error');
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;

      setContract(JSON.parse(text));
    };

    reader.readAsText(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
    // @ts-ignore
  } = useDropzone({ onDrop, accept: '.json', maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...dropzoneStyle
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedAccount(event.target.value as number);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'}>
      <PageTitle title={'New Contract'} />

      <Box display={'flex'} flexDirection={'column'} width={'300px'} mt={6}>
        <FormTitle title={'Select Account'} />
        <Select value={selectedAccount} onChange={handleChange}>
          {accountParams?.accounts.map((account, index) => {
            return (
              <MenuItem key={index} value={index}>
                {account}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box mt={6}>
        <Box mb={2}>
          <FormTitle title={'Select Contract'} />
        </Box>
        <Box className={classes.dropzoneWrapper}>
          <Box component={'div'} {...getRootProps(style)}>
            <input {...getInputProps()} />
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={'100%'}
              height={'100%'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <BackupRoundedIcon />
              <Typography>
                <span
                  style={{
                    fontWeight: 600
                  }}
                >
                  Click to upload
                </span>{' '}
                or drag and drop
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box mt={4}>
        <ActionButton
          text={'Deploy Contract'}
          square={true}
          startIcon={<BackupRoundedIcon />}
          onClick={() => {
            executeDeployment();
          }}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  return {
    dropzoneWrapper: {
      backgroundColor: theme.palette.custom.darkGray,
      borderStyle: 'dashed',
      border: '2px solid #A7A7A7',
      borderRadius: '15px',
      height: '200px',
      cursor: 'pointer',
      width: '50%'
    }
  };
});

export default NewContract;
