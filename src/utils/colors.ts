export const colors = {
  black: {
    0: '#000',
    1: '#161616',
  },
  white: {
    0: '#FFF',
    1: '#7D7D7D',
  },
  orange: {
    0: '#E9724C',
  },
  gray: {
    0: '#555C5C',
  },
  fun: {
    red: '#f63032',
    redSecondary: '#fd595b',
    orange: '#f6752e',
    orangeSecondary: '#fa8e51',
    yellow: '#f6b31f',
    yellowSecondary: '#fac453',
    green: '#6bb446',
    greenSecondary: '#92dc6a',
    pink1: '#b06f77',
    pink1Secondary: '#f5a4ae',
    pink2: '#F79CB1',
    pink2Secondary: '#fcc7d3',
  },
}

export type TFunColors = keyof typeof colors.fun
export const getByColorKey = (key: TFunColors) => colors.fun[key]
