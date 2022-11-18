import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import QuitService from '../../../services/quitService/quitService';
import theme from '../../../theme/theme';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import Logo from '../../atoms/Logo/Logo';
import { EActiveAppTab } from '../../layouts/AppLayout/appLayout.types';
import NavigationBarItem from '../../molecules/NavigationBarItem/NavigationBarItem';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { INavigationBarProps } from './navigationBar.types';

const NavigationBar: FC<INavigationBarProps> = () => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState<EActiveAppTab>(
    EActiveAppTab.ACCOUNTS
  );

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/accounts':
        setActiveTab(EActiveAppTab.ACCOUNTS);
        break;
      case '/logs':
        setActiveTab(EActiveAppTab.LOGS);
        break;
      case '/contracts':
        setActiveTab(EActiveAppTab.CONTRACTS);
        break;
      case '/blockscout':
        setActiveTab(EActiveAppTab.BLOCKSCOUT);
        break;
    }
  }, [location.pathname]);

  const dashboardTabs = [
    {
      currentAppTab: EActiveAppTab.ACCOUNTS,
      toUrl: '/accounts'
    },
    {
      currentAppTab: EActiveAppTab.LOGS,
      toUrl: '/logs'
    },
    {
      currentAppTab: EActiveAppTab.CONTRACTS,
      toUrl: '/contracts'
    },
    {
      currentAppTab: EActiveAppTab.BLOCKSCOUT,
      toUrl: '/blockscout'
    }
  ];

  const { openSnackbar } = useSnackbar();
  const handleTabChange = (newActive: EActiveAppTab) => {
    setActiveTab(newActive);
  };

  const handleQuit = () => {
    const sendQuitSignal = async () => {
      await QuitService.sendQuitSignal();
    };

    sendQuitSignal()
      .then(() => {
        openSnackbar('Environment closed', 'success');
      })
      .catch((e) => {
        openSnackbar('Unable to gracefully quit', 'error');
      });
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={'100%'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'100%'}
        width={'100%'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          mt={6}
          mb={6}
        >
          <Box mb={'3rem'}>
            <Logo />
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          {dashboardTabs.map((dashboardTab, index) => {
            return (
              <NavigationBarItem
                key={`menu-item-${index}`}
                activeAppTab={activeTab}
                currentAppTab={dashboardTab.currentAppTab}
                toUrl={dashboardTab.toUrl}
                handleTabChange={handleTabChange}
              />
            );
          })}
        </Box>

        <Box
          display={'flex'}
          marginTop={'auto'}
          width={'100%'}
          marginBottom={'3rem'}
          justifyContent={'center'}
        >
          <ActionButton
            startIcon={
              <ExitToAppRoundedIcon className={'navigationItemIcon'} />
            }
            text={'Quit'}
            square={true}
            shouldSubmit={false}
            onClick={() => {
              handleQuit();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  return {
    titleText: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      fontFamily: 'Montserrat'
    },
    menuItemText: {
      fontWeight: 500,
      fontSize: '1rem',
      fontFamily: 'Montserrat'
    },
    menuItemTextInactive: {
      color: theme.palette.custom.transparentBlack
    }
  };
});

export default NavigationBar;
