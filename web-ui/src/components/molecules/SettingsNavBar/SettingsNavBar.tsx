import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import clsx from 'clsx';
import React, { FC } from 'react';
import theme from '../../../theme/theme';
import Link from '../../atoms/Link/Link';
import { ISettingsNavBarProps } from './settingsNavBar.types';

const SettingsNavBar: FC<ISettingsNavBarProps> = (props) => {
  const classes = useStyles();

  const { activeAppTab, currentAppTab, toUrl, handleTabChange } = props;

  const isActive = activeAppTab === currentAppTab;
  return (
    <Box
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Link
        to={toUrl}
        onClick={() => handleTabChange(currentAppTab)}
        style={{
          textDecoration: 'none'
        }}
      >
        <Box
          display={'flex'}
          className={clsx(classes.settingsWrapper, {
            [classes.activeWrapper]: isActive
          })}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <SettingsRoundedIcon
            className={'navigationItemIcon'}
            style={{
              fill: isActive
                ? theme.palette.primary.main
                : theme.palette.custom.transparentBlack
            }}
          />
          <Typography
            className={clsx(classes.menuItemText, {
              [classes.menuItemTextInactive]: !isActive
            })}
          >
            Settings
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  return {
    settingsWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '18px 32px',
      color: theme.palette.primary.main,
      fontWeight: 600,
      borderRadius: '10px',
      textDecoration: 'none !important',
      '&:hover': {
        background: theme.palette.custom.darkGray
      },
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.short
      })
    },
    activeWrapper: {
      background: theme.palette.custom.darkGray
    },
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

export default SettingsNavBar;
