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
    red: '#FA5557',
    redSecondary: '#fa7e80',
    orange: '#F9A272',
    orangeSecondary: '#fcc1a0',
    yellow: '#FACF71',
    yellowSecondary: '#fadb99',
    green: '#87B76F',
    greenSecondary: '#b9fa98',
    pink1: '#FBA4AF',
    pink1Secondary: '#faced4',
    pink2: '#F79CB1',
    pink2Secondary: '#fcc7d3',
  },
}

export type TFunColors = keyof typeof colors.fun
export const getByColorKey = (key: TFunColors) => colors.fun[key]
