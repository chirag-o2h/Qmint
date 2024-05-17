import React from 'react';
import { Theme } from '@mui/material/';
import createTheme from "@mui/material/styles/createTheme";

// Assets
import { ArrowDown, CheckboxCheckedIcon, CheckboxUncheckedIcon, RadioCheckedIcon, RadioUncheckedIcon } from './assets/icons/index';

// Utils
import { pxToRem } from './utils/helper';
import * as  variable from './scss/settings/variables.module.scss'
import { THEME_TYPE } from './axiosfolder';

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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          width: "100%",
          height: "100%",
          fontSize: "15px",
          // '@media (max-width: 900px)': {
          // },
        },
        body: {
          width: "100%",
          height: "100%",
        },
        img: {
          verticalAlign: "middle",
          userSelect: "none",
          maxWidth: "100%",
          height: "auto",
        },
        svg: {
          verticalAlign: "middle",
        },
        video: {
          verticalAlign: "middle",
        },
        "#root": {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D212980",
        },
        invisible: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        fixed: true,
      },
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          '@media (max-width: 900px)': {
            maxWidth: "initial",
          },
          '@media (min-width: 900px) and (max-width: 1200px)': {
            maxWidth: 1000,
          },
          '@media (min-width: 1200px) and (max-width: 1580px)': {
            maxWidth: "calc(1200px + 48px)", // 48px:: sum of horizontal padding
          },
          '@media (min-width: 1800px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        flexDirection: "row",
        useFlexGap: true,
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          bodySmall: "p",
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
        hiddenLabel: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        input: {
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: `${variable.dark}33`,
            },
          },
        },
        input: {
          paddingTop: 18.5,
          paddingBottom: 18.5,
          paddingLeft: 23,
          paddingRight: 23,
        },
        notchedOutline: {
          borderColor: `${variable.dark}33`,
        },
        multiline: {
          padding: 0,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDown,
      },
      styleOverrides: {
        root: {
          ".MuiMenuItem-root": {
            whiteSpace: "normal",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: variable.dark,
          lineHeight: pxToRem(26),
          marginBottom: 4,
        },
      },
    },

    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #E5E6EB",
          marginTop: "8px !important",
        },
        input: {
          "&:-webkit-autofill": {
            borderRadius: "inherit",
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: "#1D2129",
          fontSize: pxToRem(14),
          lineHeight: pxToRem(20),
          fontWeight: 600,
          position: "static",
          transform: "none",
        },
        asterisk: {
          color: "#FF1F1F",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "initial",
          minWidth: "initial",
        },
        text: {
          padding: 0,
        },
        textPrimary: {
          "&:hover": {
            color: "#1D2129",
            backgroundColor: "transparent",
          },
        },
        textSecondary: {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 600,
          textDecoration: "underline",
          "&:hover": {
            color: "#EAA22B",
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        },
        containedSizeMedium: {
          fontSize: "1rem",
          padding: "9px 18px",
        },
        containedSizeLarge: {
          fontSize: pxToRem(16),
          lineHeight: pxToRem(20),
          fontWeight: 600,
          padding: "17px 23px",
        },
        outlinedSizeMedium: {
          fontSize: "1rem",
          padding: "8px 18px",
        },
        outlinedSizeLarge: {
          fontSize: pxToRem(16),
          lineHeight: pxToRem(20),
          fontWeight: 600,
          padding: "16px 23px",
        },
        containedInfo: {
          backgroundColor: `${variable.elephant}`,
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: variable.yellowFuel,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        sizeMedium: {
          height: 40,
          width: 40,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          cursor: "pointer",
          color: "#1D2129",
          overflowWrap: "anywhere",
          // overflowWrap: anywhere;
          transition: "300ms all ease",
          "&:hover": {
            color: "#EAA22B",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          opacity: 1,
        },
        vertical: {
          height: 18,
          alignSelf: "initial",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardActions: {
      defaultProps: {
        disableSpacing: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 0,
        disablePortal: true,
      },
      styleOverrides: {
        paper: {
          boxShadow:
            "0px -2px 17.4px rgba(0, 0, 0, 0.05), 0px 5px 35.4px rgba(0, 0, 0, 0.07);",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          border: "1px solid #E5E6EB",
          borderRadius: 30,
        },
        grouped: {
          margin: 0,
          border: "none",
          minWidth: 153,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: "inherit",
          "&.Mui-selected": {
            fontWeight: 700,
            fontStyle: "normal",
            color: "#FFFFFF",
            backgroundColor: "#EAA22B",
            letterSpacing: 1,
            "&:hover": {
              backgroundColor: "#EAA22B",
            },
            "@media (max-width: 600px)": {
              minWidth: 120,
            },
          },
          "@media (max-width: 600px)": {
            minWidth: 100,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: 300,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&[data-value="none"]': {
            display: 'none',
          },
        },
      },
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
        disableGutters: true,
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          noWrap: true,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        colorDefault: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          // color: "#FFFFFF",
          fontSize: pxToRem(20),
        },
        tooltip: {
          // padding: 0,
          // color: "#1D2129",
          // backgroundColor: "#FFFFFF",
          // boxShadow: "0px 20px 30px 0px #0000000F",
        },
        popper: {
          "&[data-popper-placement*='bottom']": {
            ".MuiTooltip-tooltip": {
              "&.MuiTooltip-tooltipPlacementBottom": {
                marginTop: 14,
              },
            },
          },
        },
        tooltipPlacementTop: {
          ".MuiTooltip-arrow": {
            "&:before": {
              borderBottomRightRadius: 4,
            },
          },
        },
        tooltipPlacementBottom: {
          ".MuiTooltip-arrow": {
            "&:before": {
              borderTopLeftRadius: 4,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          boxShadow: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 2,
          padding: "6px 0",
        },
        rail: {
          opacity: 0.5,
          height: 1,
        },
        thumb: {
          height: 14,
          width: 14,
          border: "2px solid currentColor",
          backgroundColor: "#FFFFFF",
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&::before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
        disableGutters: true,
        square: true,
      },
      styleOverrides: {
        root: {
          '&::before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <ArrowDown />,
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 8,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckboxUncheckedIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
      },
      styleOverrides: {
        colorPrimary: {
          "&.Mui-disabled": {
            color: "#EAA22B",
            opacity: 0.2,
            "svg": {
              "path:first-of-type": {
                stroke: "#1D2129",
              },
            },
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <RadioUncheckedIcon />,
        checkedIcon: <RadioCheckedIcon />,
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
        scrollButtons: {
          "&.Mui-disabled": {
            opacity: 0.3,
          },
        },

        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        textColorSecondary: {
          padding: "13px 39px",
          minHeight: 54,
          borderRadius: 10,
          fontSize: 16,
          lineHeight: "28px",
          fontWeight: 500,
          "&.Mui-selected": {
            backgroundColor: variable.yellowFuel,
            color: variable.white,
            fontWeight: 700,
          },
          "@media (max-width: 600px)": {
            padding: "6px 20px",
            minHeight: "initial",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          transition: '400ms all ease',
          "&:hover": {
            color: `${variable.yellowFuel}`,
            backgroundColor: 'transparent !important',
          },
          "@media (max-width: 600px)": {
            minHeight: "initial !important",
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          lineHeight: "normal",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          minWidth: 28,
          height: 28,
        },
        ellipsis: {
          minWidth: 20,
          margin: 0,
        },
      },
    },
  },
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
