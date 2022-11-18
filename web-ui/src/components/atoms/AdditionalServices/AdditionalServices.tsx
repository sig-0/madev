import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetupContext from '../../../context/SetupContext';
import { EAdditionalService } from '../../../context/setupContext.types';
import DeploymentService from '../../../services/deploymentService/deploymentService';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { ESetupStep, ISetupItemProps } from '../../pages/SetupPage/setup.Types';
import ActionButton from '../ActionButton/ActionButton';
import PageTitle from '../PageTitle/PageTitle';

const AdditionalServices: FC<ISetupItemProps> = (props) => {
  const { next } = props;

  const { setAdditionalServices, accountParams } = useContext(SetupContext);

  const [services, setServices] = useState<Map<EAdditionalService, boolean>>(
    new Map<EAdditionalService, boolean>([
      [EAdditionalService.BLOCKSCOUT, true]
    ])
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

  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const startDeploying = () => {
    next();

    const additionalServices: EAdditionalService[] = [];

    for (let entry of Array.from(services.entries())) {
      additionalServices.push(entry[0]);
    }

    setAdditionalServices({ services: additionalServices });

    const startDeployment = async () => {
      await DeploymentService.startDeployment({
        // @ts-ignore
        premine_accounts: accountParams.accounts
      });
    };

    startDeployment()
      .then(() => {
        navigate('/accounts');

        openSnackbar('Deployment successful', 'success');
      })
      .catch(() => {
        openSnackbar('Unable to perform deployment', 'error');
      });
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
