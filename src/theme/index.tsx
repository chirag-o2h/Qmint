import React from 'react';
import { Theme } from '@mui/material/';
import createTheme from "@mui/material/styles/createTheme";

// Assets
import { ArrowDown, CheckboxCheckedIcon, CheckboxUncheckedIcon, RadioCheckedIcon, RadioUncheckedIcon } from '../assets/icons/index';

// Utils
import { pxToRem } from '../utils/helper';
import * as  variable from '../scss/settings/variables.module.scss'
import { THEME_TYPE } from '../axiosfolder';

// Components
import components from "./components"

const themeTypes :any= {
  0 : "#EAA22B",
  1 : "#FF681A",
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: themeTypes[THEME_TYPE ?? 0],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1D2129",
      contrastText: "#FFFFFF",
    },
    success: {
      main: variable.success,
    },
    error: {
      main: variable.error,
    },
    divider: "#1d212933",
    tonalOffset: 0.1,
    text: {
      primary: "#1D2129",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    button: {
      lineHeight: 1.5,
    },
    // Display Medium
    h2: {
      fontSize: pxToRem(40),
      lineHeight: pxToRem(54),
      fontWeight: 700,
      "@media (max-width: 1440px)": {
        fontSize: pxToRem(26),
        lineHeight: pxToRem(34),
      },
      "@media (max-width: 900px)": {
        fontSize: pxToRem(24),
        lineHeight: pxToRem(32),
      },
    },
    h3: {
      fontSize: pxToRem(36),
      fontWeight: 700,
      "@media (max-width: 900px)": {
        fontSize: pxToRem(26),
      },
    },
    // Display Small
    h4: {
      fontSize: pxToRem(32),
      lineHeight: pxToRem(36),
      fontWeight: 700,
      "@media (max-width: 900px)": {
        fontSize: pxToRem(22),
        lineHeight: pxToRem(30),
      },
    },
    // Title Medium
    body1: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(26),
      fontWeight: 500,
    },
    // Body Large
    body2: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
    },
    // Headline Small
    subtitle1: {
      fontSize: pxToRem(18),
      lineHeight: pxToRem(28),
      fontWeight: 700,
      "@media (max-width: 900px)": {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(28),
      },
    },
    // Headline Medium
    subtitle2: {
      fontSize: pxToRem(22),
      lineHeight: pxToRem(30),
      fontWeight: 500,
      "@media (max-width: 900px)": {
        fontSize: pxToRem(18),
        lineHeight: pxToRem(24),
      },
    },
    // Title Small
    overline: {
      fontSize: pxToRem(14),
      lineHeight: pxToRem(20),
      fontWeight: 600,
      textTransform: "initial",
    },
    // Title Large
    titleLarge: {
      fontSize: pxToRem(16),
      lineHeight: pxToRem(28),
      fontWeight: 700,
    },
    // Body Small
    bodySmall: {
      fontSize: pxToRem(12),
      lineHeight: pxToRem(26),
      fontWeight: 400,
    },
    // Body Medium
    caption: {
      fontSize: pxToRem(13),
      lineHeight: pxToRem(18),
      fontWeight: 600,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1580,
    },
  },
  components: { ...components(THEME_TYPE) },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1099,
  },
});

export default theme;
