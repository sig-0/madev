import { Box, Typography } from '@material-ui/core';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SetupContext from '../../../context/SetupContext';
import theme from '../../../theme/theme';
import FormTitle from '../../atoms/FormTitle/FormTitle';
import NoData from '../../atoms/NoData/NoData';
import { IContractsListProps } from './contractsList.types';

const ContractsList: FC<IContractsListProps> = () => {
  const { contracts } = useContext(SetupContext);

  const navigate = useNavigate();

  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      ml={contracts != null ? -4 * contracts.contracts.length : 0}
    >
      {(contracts == null || contracts.contracts.length == 0) && (
        <NoData text={'No contracts deployed'} />
      )}

      {contracts != null &&
        contracts.contracts.map((contract, index) => {
          return (
            <Box
              display={'flex'}
              width={'300px'}
              height={'100px'}
              ml={4}
              flexDirection={'column'}
              className={'truncate'}
              boxShadow={theme.palette.boxShadows.darker}
              borderRadius={'10px'}
              padding={'10px 15px'}
              justifyContent={'space-between'}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                navigate(`/contracts/view/${contract.address}`);
              }}
            >
              <FormTitle title={`Contract ${index}`} />
              <Typography className={'truncate'}>{contract.address}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default ContractsList;
