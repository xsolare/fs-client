import type { ThemeVarious } from '#/contexts/theme'

const Breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920
}

export const breakpoint = (n: keyof typeof Breakpoints, size?: 'min' | 'max'): string =>
  `@media (${size ?? 'max'}-width: ${Breakpoints[n]}px)`

export const pxToRem = (pxValue: number, baseFontSize: number): string =>
  `${pxValue / baseFontSize || 16}rem`

const sizes = {
  header: { height: '50px' }
}

const font = {
  family: {
    base: 'Rubik, sans-serif',
    monospace: `
    "sfmono-regular, menlo, monaco, consolas, 'Liberation Mono', 'Courier New'"
    `,
    text: 'Rubik'
  },
  size: {
    base: '1rem !default',
    lg: '1.25rem !default',
    sm: '0.875rem !default'
  }
}

const paletteLight = {
  color: {
    text: '#262728',
    subText: '#535353',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f',
    header: '#e0e0e0',
    panel: '#e4e4e4',
    subPanel: '#6d6e6f'
  },
  bg: {
    main: '#eeeeee',
    mainContent: '#e4e4e4',
    modal: '#333',
    modalContent: '#444',
    highlight: '#6db6ff',
    header: 'linear-gradient(to top right,  #232325, #292929, #232325)',
    headerBlur: 'rgba(24, 24, 24, 0.7)',
    panelGradient: 'linear-gradient(to left,  #232325, #292929, #232325)',
    panel: '#232325'
  },
  border: {
    header: '#7e7e7e',
    title: '#161b22',
    content: '#7e7e7e'
  },
  shadow: {
    itemContent: '0 0 5px rgba(0, 0, 0, 0.25)'
  },
  divider: '#cccccc'
}

const paletteDark = {
  color: {
    text: '#e4e4e4',
    subText: '#ababab',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f',
    header: '#e0e0e0',
    panel: '#e4e4e4',
    subPanel: '#e0e0e0'
  },
  bg: {
    main: '#1e1f20',
    mainContent: '#121314',
    modal: '#333',
    modalContent: '#444',
    highlight: '#f65341',
    header: 'linear-gradient(to top right,  #232325, #292929, #232325)',
    headerBlur: 'rgba(24, 24, 24, 0.7)',
    panelGradient: 'linear-gradient(to left, #232325, #292929, #232325)',
    panel: '#232325'
  },
  border: {
    header: '#474747',
    title: '#6c757d',
    content: '#474747'
  },
  shadow: {
    itemContent: '0 0 5px rgba(0, 0, 0, 0.25)'
  },
  divider: '#808080'
}

const paletteBlue = {
  color: {
    text: '#e4e4e4',
    subText: '#959595',
    textInvert: '#e4e4e4',
    subTextInvert: '#6d6e6f',
    header: '#e0e0e0',
    panel: '#e4e4e4',
    subPanel: '#e0e0e0'
  },
  bg: {
    main: '#0d1117',
    mainContent: '#161b22',
    modal: '#1b222c',
    modalContent: '#141d27',
    highlight: '#6db6ff',
    header: 'linear-gradient(to top right,  #161b22, #1d242d, #161b22)',
    headerBlur: 'rgba(24, 24, 24, 0.7)',
    panelGradient: 'linear-gradient(to left,  #161b22, #1d242d, #161b22)',
    panel: '#161b22'
  },
  border: {
    header: '#161b22',
    title: '#5d6a7e',
    content: '#253241'
  },
  shadow: {
    itemContent: '0 0 5px rgba(0, 0, 0, 0.25)'
  },
  divider: '#808080'
}

export type ThemeTypes = typeof themeLigth

export const themeLigth = {
  palette: paletteLight,
  font,
  sizes
}

export const themeDark: ThemeTypes = {
  ...themeLigth,
  palette: {
    ...themeLigth.palette,
    ...paletteDark
  }
}

export const themeBlue: ThemeTypes = {
  ...themeLigth,
  palette: {
    ...themeLigth.palette,
    ...paletteBlue
  }
}

export const emotionThemes: Record<string, ThemeTypes> = {
  light: themeLigth,
  dark: themeDark,
  blue: themeBlue
}

export const getEmotionThemes = (theme: ThemeVarious): ThemeTypes => emotionThemes[theme]
