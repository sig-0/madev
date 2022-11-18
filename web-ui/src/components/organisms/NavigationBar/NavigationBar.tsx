import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {FC, useEffect, useState} from 'react';
import {useLocation} from 'react-router';
import theme from '../../../theme/theme';
import Logo from '../../atoms/Logo/Logo';
import {EActiveAppTab} from '../../layouts/AppLayout/appLayout.types';
import NavigationBarItem from '../../molecules/NavigationBarItem/NavigationBarItem';
import SettingsNavBar from '../../molecules/SettingsNavBar/SettingsNavBar';
import {INavigationBarProps} from './navigationBar.types';

const NavigationBar: FC<INavigationBarProps> = () => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState<EActiveAppTab>(
    EActiveAppTab.DEVICES
  );

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/devices':
        setActiveTab(EActiveAppTab.DEVICES);
        break;
      case '/requests':
        setActiveTab(EActiveAppTab.REQUESTS);
        break;
      case '/infrastructure':
        setActiveTab(EActiveAppTab.INFRASTRUCTURE);
        break;
      case '/settings':
        setActiveTab(EActiveAppTab.SETTINGS);
        break;
    }
  }, [location.pathname]);

  const dashboardTabs = [
    {
      currentAppTab: EActiveAppTab.DEVICES,
      toUrl: '/devices'
    },
    {
      currentAppTab: EActiveAppTab.REQUESTS,
      toUrl: '/requests'
    },
    {
      currentAppTab: EActiveAppTab.INFRASTRUCTURE,
      toUrl: '/infrastructure'
    }
  ];

  const handleTabChange = (newActive: EActiveAppTab) => {
    setActiveTab(newActive);
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
            <Logo/>
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
        >
          <SettingsNavBar
            activeAppTab={EActiveAppTab.SETTINGS}
            currentAppTab={activeTab}
            handleTabChange={handleTabChange}
            toUrl={'/settings'}
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
