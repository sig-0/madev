import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import theme from '../../../theme/theme';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import Logo from '../../atoms/Logo/Logo';
import { EActiveAppTab } from '../../layouts/AppLayout/appLayout.types';
import NavigationBarItem from '../../molecules/NavigationBarItem/NavigationBarItem';
import { INavigationBarProps } from './navigationBar.types';
import { useNavigate } from 'react-router-dom';

const NavigationBar: FC<INavigationBarProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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

  const handleTabChange = (newActive: EActiveAppTab) => {
    setActiveTab(newActive);
  };

  const handleQuit = () => {
    navigate('/quit');
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
