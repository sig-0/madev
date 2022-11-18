import { createTheme, Theme } from '@material-ui/core/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#023E8A',
      light: '#023E8A',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#0077B6',
      light: '0096C7',
      contrastText: '#FFF'
    },
    text: {
      primary: '#101010',
      secondary: '#9A9FA5'
    },
    background: {
      default: '#FFF'
    },
    error: {
      main: '#f53b56'
    },
    custom: {
      mainGray: '#F0F0F0',
      dotRed: '#D12D2D',
      lightGray: '#EFF2F5',
      white: '#FFFFFF',
      darkGray: '#F4F4F4',
      transparentBlack: 'rgba(0, 0, 0, 0.5)'
    },
    boxShadows: {
      main: '1px 3px 6px 0px rgba(128,142,155,0.1)',
      darker: '1px 3px 6px 0px rgba(128,142,155,0.3)'
    },
    deviceGradients: {
      lightBlue:
        'linear-gradient(66.19deg, #A9DEF9 2.2%, #A9DEF9 2.21%, #D7F1FF 100%, #D7F1FF 100%)',
      lightGreen: 'linear-gradient(66.19deg, #D0F4DE 2.2%, #EEFBF3 100%)',
      lightPink: 'linear-gradient(66.19deg, #FF99C8 2.2%, #FFADD3 100%)',
      lightPurple: 'linear-gradient(66.19deg, #E4C1F9 2.2%, #EFDAFB 100%)',
      lightYellow: 'linear-gradient(66.19deg, #FCF6BD 2.2%, #FDF9D8 100%)',
      lightBrown: 'linear-gradient(66.19deg, #D8D3CC 2.2%, #FFE7CA 100%)'
    }
  },
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    h1: {
      fontSize: '2.25rem'
    },
    body1: {
      fontSize: '1rem',
      textAlign: 'justify',
      textJustify: 'inter-word'
    }
  }
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: 'initial'
    },
    disabled: {
      opacity: 0.5
    }
  },
  MuiInputBase: {
    input: {
      fontFamily: 'Montserrat',
      fontSize: theme.typography.pxToRem(14),
      fontWeight: 'normal'
    }
  },
  MuiDivider: {
    root: {
      backgroundColor: theme.palette.custom.lightGray
    }
  },
  MuiTabs: {
    scrollButtons: {
      width: '30px'
    }
  }
};

export default theme;
