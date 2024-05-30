import { PaletteOptions } from "@mui/material/styles"

// Utils
import * as  variable from '../scss/settings/variables.module.scss'
import { THEME_TYPE } from '../axiosfolder';

const themeTypes: any = {
  0: "#EAA22B",
  1: "#FF681A",
}

const commonPalette: PaletteOptions = {
  tonalOffset: 0.1,
}

const qmintPalette: PaletteOptions = {
  ...commonPalette,
  primary: {
    main: themeTypes[THEME_TYPE ?? 0],
    contrastText: variable.white,
  },
  secondary: {
    main: variable.dark,
    contrastText: variable.white,
  },
  success: {
    main: variable.success,
  },
  error: {
    main: variable.error,
  },
  divider: "#1d212933",
  text: {
    primary: variable.dark,
  },
}

const bmkPalette: PaletteOptions = {
  ...commonPalette,
  primary: {
    main: themeTypes[THEME_TYPE ?? 0],
    contrastText: variable.white,
  },
  secondary: {
    main: variable.dark,
    contrastText: variable.white,
  },
  success: {
    main: variable.success,
  },
  error: {
    main: variable.error,
  },
  divider: "#1d212933",
  text: {
    primary: variable.black,
  },
}

const palette = (theme?: string) => {
  switch (theme) {
    case "0":
      return qmintPalette as PaletteOptions

    case "1":
      return bmkPalette as PaletteOptions

    default:
      return commonPalette as PaletteOptions
  }
}

export default palette