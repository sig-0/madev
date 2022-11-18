import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import { FC, useContext, useState } from 'react';
import SetupContext from '../../../context/SetupContext';
import { EAdditionalService } from '../../../context/setupContext.types';
import { ESetupStep, ISetupItemProps } from '../../pages/SetupPage/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import PageTitle from '../PageTitle/PageTitle';

const AdditionalServices: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const { setAdditionalServices } = useContext(SetupContext);

  const [services, setServices] = useState<Map<EAdditionalService, boolean>>(
    new Map<EAdditionalService, boolean>()
  );

  const toggleService = (service: EAdditionalService) => {
    services.set(service, !services.has(service));
  };

  const allServices = [
    EAdditionalService.BLOCKSCOUT,
    EAdditionalService.ETHERSCAN,
    EAdditionalService.NEW_RELIC,
    EAdditionalService.THE_GRAPH
  ];

  const startDeploying = () => {
    const additionalServices: EAdditionalService[] = [];

    for (let entry of Array.from(services.entries())) {
      additionalServices.push(entry[0]);
    }

    setAdditionalServices({ services: additionalServices });

    next();
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={4}
      width={'100%'}
    >
      <PageTitle title={ESetupStep.ADDITIONAL_SERVICES} />
      <Box mt={4}>
        <FormControl component="fieldset">
          <FormGroup>
            {allServices.map((service, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      color={'primary'}
                      checked={services.get(service)}
                      onChange={() => toggleService(service)}
                      name={service}
                    />
                  }
                  label={service}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Box>
      <Box width={'100%'} display={'flex'} mt={4} justifyContent={'center'}>
        <ActionButton
          text={'Start Environment'}
          square={true}
          onClick={() => startDeploying()}
        />
      </Box>
    </Box>
  );
};

export default AdditionalServices;
