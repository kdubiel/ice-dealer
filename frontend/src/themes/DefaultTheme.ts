import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    sideBar: {
      width: string;
    };
    topBar: {
      mobile: {
        height: string;
      };
      desktop: {
        height: string;
      };
    };
    palette: {
      background: {
        default: string;
      };
    };
  }
}
