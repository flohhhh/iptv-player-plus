import { IAudioTrack, ITextTrack } from '../../components/player/types'
import { IMovie } from '../api/moviesTypes'
import { ISerie } from '../api/seriesTypes'

interface ICommon {
  id: number

  url: string
  title: string
  imageUrl: string
  episodes?: []
  resumeAt?: number
  lastAudioTrackSelected?: IAudioTrack
  lastSubtitleTrackSelected?: ITextTrack
}

export interface IStreamMovie extends ICommon {
  type: 'movies'
  info: IMovie
}

export interface IStreamSerie extends ICommon {
  type: 'series'
  info: ISerie
}

export type IStream = IStreamMovie | IStreamSerie
