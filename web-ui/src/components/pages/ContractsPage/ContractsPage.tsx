import { Box } from '@material-ui/core';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import PageTitle from '../../atoms/PageTitle/PageTitle';
import ContractsList from '../../organisms/ContractsList/ContractsList';
import { IContractsPageProps } from './contractsPage.types';

const ContractsPage: FC<IContractsPageProps> = () => {
  const navigate = useNavigate();

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'}>
      <Box
        display={'flex'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'space-between'}
      >
        <PageTitle title={'Contracts'} />

        <Box>
          <ActionButton
            text={'Deploy Contract'}
            square={true}
            startIcon={<BackupRoundedIcon />}
            onClick={() => {
              navigate('/contracts/new');
            }}
          />
        </Box>
      </Box>
      <Box mt={6}>
        <ContractsList />
      </Box>
    </Box>
  );
};

export default ContractsPage;
