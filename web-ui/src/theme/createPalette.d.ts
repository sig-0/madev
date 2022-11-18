import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    custom?: CustomThemeColors;
    boxShadows?: CustomBoxShadows;
    deviceGradients?: CustomDeviceGradients;
  }

  interface Palette {
    custom: CustomThemeColors;
    boxShadows: CustomBoxShadows;
    deviceGradients: CustomDeviceGradients;
  }
}

interface CustomThemeColors {
  mainGray: string;
  dotRed: string;
  lightGray: string;
  white: string;
  darkGray: string;
  transparentBlack: string;
}

interface CustomBoxShadows {
  main: string;
  darker: string;
}

interface CustomDeviceGradients {
  lightBlue: string;
  lightGreen: string;
  lightYellow: string;
  lightPurple: string;
  lightPink: string;
  lightBrown: string
}
