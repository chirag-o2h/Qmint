import React from "react";
import { Components } from "@mui/material/styles"

// Assets
import { ArrowDown, CheckboxCheckedIcon, CheckboxUncheckedIcon, RadioUncheckedRoundIcon, RadioCheckedRoundIcon, RadioCheckedIcon, RadioUncheckedIcon, CheckboxUncheckedIcon1, CheckboxCheckedIcon1 } from '../assets/icons/index';
import * as  variable from '../scss/settings/variables.module.scss'

// Utils
import { pxToRem } from '../utils/helper';

import { THEME_TYPE } from "@/axiosfolder"

const commonComponents: Components = {
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
      a: {
        color: THEME_TYPE === "1" ? `${variable.pumpkinOrange}` : `${variable.yellowFuel}`,
        textDecoration: "none",
      }
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
}

const qmintComponents: Components = {
  ...commonComponents,
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
          minWidth: 90,
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
}

const bmkComponents: Components = {
  ...commonComponents,
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        bodySmall: "p",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        "&.MuiInputBase-adornedEnd": {
          paddingRight: 0,
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      positionEnd: {
        height: "initial",
        maxHeight: "initial",
        alignSelf: "stretch",
        marginLeft: 0,
        "& .MuiIconButton-root": {
          height: "100%",
          borderRadius: 0,
        },
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
        '&:hover': {
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: `${variable.dark}33`,
          },
        },
      },
      input: {
        paddingTop: 13,
        paddingBottom: 13,
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
        borderRadius: 0,
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
          color: "#FF681A",
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
        padding: "15px 23px",
        "@media (max-width: 425px)": {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
      outlinedSizeMedium: {
        fontSize: "1rem",
        padding: "8px 18px",
      },
      outlinedSizeLarge: {
        fontSize: pxToRem(16),
        lineHeight: pxToRem(20),
        fontWeight: 600,
        border: "1px solid #FF681A",
        padding: "14px 23px",
      },
      containedInfo: {
        backgroundColor: `${variable.elephant}`,
      },
      containedSecondary: {
        "&:hover": {
          backgroundColor: variable.$pumpkinOrange,
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
          color: "#FF681A",
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
        borderRadius: 0,
      },
      grouped: {
        fontSize: "18px",
        lineHeight: "26px",
        fontWeight: "400",
        color: "#1D2129",
        margin: 0,
        border: "none",
        minWidth: 131,
        paddingTop: 5,
        paddingBottom: 5,
        textTransform: "none",
        borderBottom: "5px solid #0000001A",
        borderRadius: "inherit",
        "&:hover": {
          backgroundColor: "rgba(255, 104, 26, 0.12)",
          color: "#FF681A",
        },
        "&.Mui-selected": {
          borderColor: "#FF681A",
          color: "#1D2129",
          backgroundColor: "transparent",
          "&:hover": {
            color: "#FF681A",
          },
          "@media (max-width: 600px)": {
            minWidth: 100,
          },
        },
        "@media (max-width: 600px)": {
          minWidth: 90,
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
  MuiCheckbox: {
    defaultProps: {
      icon: <CheckboxUncheckedIcon1 />,
      checkedIcon: <CheckboxCheckedIcon1 />,
    },
  },
  MuiRadio: {
    defaultProps: {
      icon: <RadioUncheckedRoundIcon />,
      checkedIcon: <RadioCheckedRoundIcon />,
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
          backgroundColor: variable.pumpkinOrange,
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
      root: {
        "& .MuiOutlinedInput-root": {
          paddingLeft: 18,
          "& .MuiOutlinedInput-input": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
      option: {
        transition: '400ms all ease',
        "&:hover": {
          color: `${variable.pumpkinOrange}`,
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
  MuiSvgIcon: {
    styleOverrides: {
      fontSizeMedium: {
        fontSize: "22px",
      },
    },
  },
}

const components = (theme?: string) => {
  switch (theme) {
    case "0":
      return qmintComponents as Components

    case "1":
      return bmkComponents as Components

    default:
      return commonComponents as Components
  }
}

export default components