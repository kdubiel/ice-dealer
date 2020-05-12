// eslint-disable-next-line import/named
import { DefaultTheme } from 'styled-components';

import { breakpoints } from 'styles';

// const baseSpacing = 24;
// const scale = 6;

// const baseFontSize = baseSpacing * 0.75; // 18
// const fontScale = baseSpacing / scale; // 4

// const borderWidth = 2;

const Light: DefaultTheme = {
  breakpoints,
  sideBar: {
    width: '240px',
  },
  topBar: {
    mobile: {
      height: '56px',
    },
    desktop: {
      height: '64px',
    },
  },
  palette: {
    background: {
      default: 'red',
    },
  },
};

export default Light;
