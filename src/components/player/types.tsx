export interface IControl {
  onPlay: () => void
  onPause: () => void
  onForward: () => void
  onRewind: () => void
  onSelectAudioTrack: () => void
  onSelectTextTrack: () => void

  paused: boolean
  progress: number
  audioTracks: IAudioTrack[] | undefined
  textTracks: ITextTrack[] | undefined
  selectedAudioTrack: IAudioTrack[] | undefined
  selectedTextTrack: IAudioTrack[] | undefined
}
export interface IProgressVideo {
  currentTime: number
  playableDuration: number
  seekableDuration: number
}

type TType = 'system' | 'disabled' | 'title' | 'language' | 'index'

export interface ITrack {
  title: TType
  value: string
}

export interface IAudioTrack {
  language: string
  title: string
  type: string
  index: number
  selected?: boolean
}

export interface ITextTrack {
  language: string
  title: string
  type: string
  index: number
  selected?: boolean
}
