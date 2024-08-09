require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}` // Load the correct .env file based on the NODE_ENV
  });
const fs = require('fs');
const path = require('path');
const test = process.env.REACT_APP_QMINT_THEME_MAIN_COLOR
console.log("🚀 ~ test:", test, process.env.NODE_ENV)
// Your scssVariables object
const scssVariables = {
    // Typography
    fontFamily: process.env.REACT_APP_FONT_FAMILY || `"Open Sans", sans-serif`,
    fontFamilyOpenSans: process.env.REACT_APP_FONT_FAMILY_OPEN_SANS || `'Open Sans'`,

    // Breakpoints
    xxs: process.env.REACT_APP_BREAKPOINT_XXS || '350px',
    xs: process.env.REACT_APP_BREAKPOINT_XS || '425px',
    sm: process.env.REACT_APP_BREAKPOINT_SM || '600px',
    ssm: process.env.REACT_APP_BREAKPOINT_SSM || '700px',
    md: process.env.REACT_APP_BREAKPOINT_MD || '900px',
    mmd: process.env.REACT_APP_BREAKPOINT_MMD || '1000px',
    mmmd: process.env.REACT_APP_BREAKPOINT_MMMD || '1100px',
    lg: process.env.REACT_APP_BREAKPOINT_LG || '1200px',
    llg: process.env.REACT_APP_BREAKPOINT_LLG || '1300px',
    xl: process.env.REACT_APP_BREAKPOINT_XL || '1440px',
    xxl: process.env.REACT_APP_BREAKPOINT_XXL || '1580px',

    // Z-index
    appBar: process.env.REACT_APP_Z_INDEX_APP_BAR || '1100',

    // Colors
    white: process.env.REACT_APP_COLOR_WHITE || '#ffffff',
    whiteMilk: process.env.REACT_APP_COLOR_WHITE_MILK || '#fcfcfd',
    error: process.env.REACT_APP_COLOR_ERROR || '#ff1f1f',
    redCoral: process.env.REACT_APP_COLOR_RED_CORAL || '#F53F3F',
    sinopia: process.env.REACT_APP_COLOR_SINOPIA || '#d13200',
    success: process.env.REACT_APP_COLOR_SUCCESS || '#008001',
    success10: process.env.REACT_APP_COLOR_SUCCESS10 || '#04ca041a',
    yellowFuel: process.env.REACT_APP_QMINT_THEME_MAIN_COLOR || '#eaa22b',
    yellowFuel05: process.env.REACT_APP_COLOR_YELLOW_FUEL05 || '#eaa22b0d',
    pumpkinOrange: process.env.REACT_APP_BMK_THEME_MAIN_COLOR || '#FF681A',

    dark: process.env.REACT_APP_COLOR_DARK || '#1d2129',
    black: process.env.REACT_APP_COLOR_BLACK || '#000000',
    mirage: process.env.REACT_APP_COLOR_MIRAGE || '#212121',
    elephant: process.env.REACT_APP_COLOR_ELEPHANT || '#1c3049',
    greyRegent: process.env.REACT_APP_COLOR_GREY_REGENT || '#86909c',
    greyLight: process.env.REACT_APP_COLOR_GREY_LIGHT || '#d9d9d9',
    greyCarbon: process.env.REACT_APP_COLOR_GREY_CARBON || '#606060',
    greyWarm: process.env.REACT_APP_COLOR_GREY_WARM || '#939393',
    starDust: process.env.REACT_APP_COLOR_STAR_DUST || '#9c9c9c',
    blueCyan: process.env.REACT_APP_COLOR_BLUE_CYAN || '#3491fa',
    blueDress: process.env.REACT_APP_COLOR_BLUE_DRESS || '#2a87f4',
    blueTealish: process.env.REACT_APP_COLOR_BLUE_TEALISH || '#1a5aff',
    mercury: process.env.REACT_APP_COLOR_MERCURY || '#e5e6eb',
    mercury30: process.env.REACT_APP_COLOR_MERCURY30 || 'rgb(229 230 235 / 30%)',
    palladium: process.env.REACT_APP_COLOR_PALLADIUM || '#e5e6eb',
    brownPale: process.env.REACT_APP_COLOR_BROWN_PALE || '#957c4f',
    whiteLilac: process.env.REACT_APP_COLOR_WHITE_LILAC || '#f7f8fa',
    copper: process.env.REACT_APP_COLOR_COPPER || '#b87333',
    silverSand: process.env.REACT_APP_COLOR_SILVER_SAND || '#c0c0c0',
    goldTips: process.env.REACT_APP_COLOR_GOLD_TIPS || '#e6b80b',
    paleGrey: process.env.REACT_APP_COLOR_PALE_GREY || '#1d2129a6',
    water: process.env.REACT_APP_COLOR_WATER || '#e2e2e2',
    red: process.env.REACT_APP_COLOR_RED || '#dd4b39',
    red10: process.env.REACT_APP_COLOR_RED10 || '#dd4b391a',
    silver: process.env.REACT_APP_COLOR_SILVER || '#c0c0c0',
    peachSoft: process.env.REACT_APP_COLOR_PEACH_SOFT || '#F1EEEB',
    greenishCyan: process.env.REACT_APP_COLOR_GREENISH_CYAN || '#797979',
    seashell: process.env.REACT_APP_COLOR_SEASHELL || '#f0f0f0',

    // Shadows
    shadow1: process.env.REACT_APP_SHADOW1 || '0px 9px 14.5px 0px rgba(194, 125, 11, 0.28)',
    shadow2: process.env.REACT_APP_SHADOW2 || '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    shadow3: process.env.REACT_APP_SHADOW3 || '0px 3px 25.7px 0px rgba(0, 0, 0, 0.04)',
    shadow4: process.env.REACT_APP_SHADOW4 || '0px 5px 8.4px 0px rgba(0, 0, 0, 0.11)',
    shadow5: process.env.REACT_APP_SHADOW5 || '0px 10px 30px 0px rgba(0, 0, 0, 0.13)',
    shadow6: process.env.REACT_APP_SHADOW6 || '0px 20px 30.6px 0px rgba(0, 0, 0, 0.06)',
    shadow7: process.env.REACT_APP_SHADOW7 || '2px 4px 12px rgba(0, 0, 0, 0.08)',
    shadow8: process.env.REACT_APP_SHADOW8 || '0px 20px 30px 0px #0000000f',
    shadow9: process.env.REACT_APP_SHADOW9 || '0px -14px 53px 0px #00000026',
    shadow10: process.env.REACT_APP_SHADOW10 || '6px 6px 27px 0px #0000000d',
    shadow11: process.env.REACT_APP_SHADOW11 || '0px 12px 31.6px 0px #0000000F',
    shadow11Alternate: process.env.REACT_APP_SHADOW11_ALTERNATE || '0px -2px 17px 0px #0000000D, 0px 5px 35px 0px #00000012',

    // Text Shadow
    textShadow1: process.env.REACT_APP_TEXT_SHADOW1 || '0px 11px 11.7px rgba(0, 0, 0, 0.25)'
};

// Generate SCSS content
const scssContent = Object.entries(scssVariables)
    .map(([key, value]) => `$${key}: ${value};`)
    .join('\n');

// Write SCSS content to file
fs.writeFileSync(path.join(__dirname, 'src/scss/settings/_variables.scss'), scssContent);
