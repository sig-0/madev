import { Box, Button } from '@material-ui/core';
import { FC } from 'react';
import { EBackendProvider } from '../../../context/setupContext.types';
import { ISetupItemProps } from '../../pages/Setup/setup.Types';
import PageTitle from '../PageTitle/PageTitle';

const ProviderSelect: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const availableProviders: EBackendProvider[] = [
    EBackendProvider.POLYGON_EDGE,
    EBackendProvider.AVALANCHE,
    EBackendProvider.GETH
  ];

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      height={'100%'}
      flexDirection={'column'}
    >
      <PageTitle title={'Select Provider'} />
      <Box display={'flex'} ml={availableProviders.length * -2} mt={4}>
        {availableProviders.map((provider, index) => {
          return (
            <Box key={index} ml={2}>
              <Button
                size={'large'}
                disabled={index != 0}
                variant={'outlined'}
                onClick={() => {
                  next();
                }}
              >
                {provider}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProviderSelect;
