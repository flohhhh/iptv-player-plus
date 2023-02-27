import { TTypeUrl } from '../api/utils'
import { IAudioTrack, ITextTrack } from '../../components/player/types'

export interface IStream {
  id: number
  type: TTypeUrl
  url: string
  episodes?: []
  resumeAt?: number
  lastAudioTrackSelected?: IAudioTrack
  lastSubtitleTrackSelected?: ITextTrack
}
