import { Box, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeviceHubRoundedIcon from '@material-ui/icons/DeviceHubRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SettingsRemoteRoundedIcon from '@material-ui/icons/SettingsRemoteRounded';
import clsx from 'clsx';
import React, { FC } from 'react';
import theme from '../../../theme/theme';
import Link from '../../atoms/Link/Link';
import { EActiveAppTab } from '../../layouts/AppLayout/appLayout.types';
import { INavigationBarItemProps } from './navigationBarItem.types';

const NavigationBarItem: FC<INavigationBarItemProps> = (props) => {
  const { activeAppTab, currentAppTab, toUrl, handleTabChange } = props;

  const classes = useStyles();

  const isActive: boolean = activeAppTab === currentAppTab;

  const renderIcon = () => {
    switch (currentAppTab) {
      case EActiveAppTab.DEVICES:
        return (
          <SettingsRemoteRoundedIcon
            className={'navigationItemIcon'}
            style={{
              fill: isActive
                ? theme.palette.primary.main
                : theme.palette.custom.transparentBlack
            }}
          />
        );
      case EActiveAppTab.REQUESTS:
        return (
          <PeopleAltRoundedIcon
            className={'navigationItemIcon'}
            style={{
              fill: isActive
                ? theme.palette.primary.main
                : theme.palette.custom.transparentBlack
            }}
          />
        );
      case EActiveAppTab.INFRASTRUCTURE:
        return (
          <DeviceHubRoundedIcon
            className={'navigationItemIcon'}
            style={{
              fill: isActive
                ? theme.palette.primary.main
                : theme.palette.custom.transparentBlack
            }}
          />
        );
    }
  };

  return (
    <Link
      to={toUrl}
      onClick={() => handleTabChange(currentAppTab)}
      style={{
        textDecoration: 'none'
      }}
    >
      <Box display={'flex'}>
        <Box
          display={'block'}
          component={'span'}
          className={clsx({
            [classes.navigationCursor]: isActive,
            [classes.navigationCursorBlank]: !isActive
          })}
        />
        <Box
          display={'flex'}
          className={clsx(classes.navigationItem, {
            [classes.activeNavigationItem]: isActive
          })}
        >
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {renderIcon()}
            <Typography
              className={clsx(classes.menuItemText, {
                [classes.menuItemTextInactive]: !isActive
              })}
            >
              {currentAppTab}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    navigationCursor: {
      borderRadius: '0 5px 5px 0',
      width: '5px',
      backgroundColor: '#023E8A',
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.short
      })
    },
    navigationCursorBlank: {
      borderRadius: '0 5px 5px 0',
      width: '5px',
      backgroundColor: 'transparent',
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.short
      })
    },
    navigationItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '18px 64px',
      color: theme.palette.primary.main,
      fontWeight: 600,
      textDecoration: 'none !important',
      '&:hover': {
        background: theme.palette.custom.darkGray
      },
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.short
      })
    },
    activeNavigationItem: {
      background: theme.palette.custom.mainGray
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

export default NavigationBarItem;
