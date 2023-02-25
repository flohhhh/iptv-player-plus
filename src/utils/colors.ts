import { randomValue } from './random'

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
    1: '#455656',
    2: '#2f3a3a',
    3: '#1d2323',
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
    pink: '#b06f77',
    pinkSecondary: '#f5a4ae',
  },
}

export type TFunColors = 'red' | 'orange' | 'yellow' | 'green' | 'pink'
export const getByColorKey = (key: TFunColors) => colors.fun[key]

const arr: TFunColors[] = ['red', 'orange', 'yellow', 'green', 'pink']
export const getRandomFunColors = () => {
  return arr[randomValue(0, arr.length - 1)]
}
