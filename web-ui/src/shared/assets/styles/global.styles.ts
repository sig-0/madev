import theme from '../../../theme/theme';

export const globalStyles = {
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    },
    '#root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    a: {
      textDecoration: 'underline',
      wordBreak: 'break-word',
      color: theme.palette.primary.main
    },
    img: {
      maxWidth: '100%'
    },
    iframe: {
      width: '100%',
      height: '500px',
      border: 0
    },
    '.pointer': {
      cursor: 'pointer'
    },
    '.ellipsis': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.noDecoration': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '.truncate': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.navigationItemIcon': {
      width: '26px',
      height: 'auto',
      marginRight: '12px',
      imageRendering: '-webkit-optimize-contrast'
    },
    '.actionButtonRounded': {
      fontFamily: 'Montserrat',
      padding: '8px 16px',
      borderRadius: '20px'
    },
    '.MuiDataGrid-columnHeaderTitleContainer': {
      justifyContent: 'center'
    },
    '.MuiDataGrid-columnHeaderTitle': {
      fontWeight: '700 !important'
    },
    '.muiGridTableCell': {
      fontWeight: 500,
      outline: 'none !important'
    },
    '.iconButtonRoot': {
      padding: '3px'
    },
    textarea: {
      fontSize: '0.875rem !important'
    },
    '.sectionTitle': {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: 'black'
    },
    '.sectionDivider': {
      height: '3px',
      backgroundColor: 'black',
      borderRadius: '15px'
    },
    '.MuiTypography-body1': {
      fontFamily: 'Montserrat'
    },
    '.item-enter': {
      opacity: 0
    },
    '.item-enter-active': {
      opacity: 1,
      transition: 'opacity 200ms ease-in'
    },
    '.item-exit': {
      opacity: 1
    },
    '.item-exit-active': {
      opacity: 0,
      transition: 'opacity 200ms ease-in'
    },
    '.codeText': {
      fontWeight: 600,
      color: '#9C9C9C',
      fontFamily: 'Source Code Pro',
      fontSize: '1.05rem'
    }
  }
};
