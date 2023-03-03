import { IStream, IStreamMovie, IStreamSerie } from './types'

export const isMovieStream = (x: IStream): x is IStreamMovie => {
  return x.type === 'movies'
}

export const isSerieStream = (x: IStream): x is IStreamSerie => {
  return x.type === 'series'
}
