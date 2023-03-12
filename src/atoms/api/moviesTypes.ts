import { IGenericByCategory } from './types'

export interface IInfoMovieData {
  info: IInfo
  movie_data: IMovieData
}
export interface IMovie extends IGenericByCategory {
  stream_type: string
  stream_id: number
  stream_icon: string
  added: string
  container_extension: string
  direct_source: string
  custom_sid?: any
}

export interface IInfo {
  tmdb_id: string
  name: string
  o_name: string
  cover_big: string
  movie_image: string
  releasedate: string
  youtube_trailer: string
  director: string
  actors: string
  cast: string
  description: string
  plot: string
  age: string
  country: string
  genre: string
  backdrop_path: string[]
  duration_secs: string
  duration: string
  video: IVideo
  audio: IAudio
  bitrate: number
  rating: string
  status: string
  runtime: string
}

export interface IVideo {
  index: number
  codec_name: string
  codec_long_name: string
  profile: string
  codec_type: string
  codec_tag_string: string
  codec_tag: string
  width: number
  height: number
  coded_width: number
  coded_height: number
  closed_captions: number
  film_grain: number
  has_b_frames: number
  sample_aspect_ratio: string
  display_aspect_ratio: string
  pix_fmt: string
  level: number
  color_range: string
  color_space: string
  color_transfer: string
  color_primaries: string
  chroma_location: string
  field_order: string
  refs: number
  is_avc: string
  nal_length_size: string
  r_frame_rate: string
  avg_frame_rate: string
  time_base: string
  start_pts: number
  start_time: string
  bits_per_raw_sample: string
  extradata_size: number
  disposition: IDisposition
  tags: ITags
}

export interface IAudio {
  index: number
  codec_name: string
  codec_long_name: string
  codec_type: string
  codec_tag_string: string
  codec_tag: string
  sample_fmt: string
  sample_rate: string
  channels: number
  channel_layout: string
  bits_per_sample: number
  r_frame_rate: string
  avg_frame_rate: string
  time_base: string
  start_pts: number
  start_time: string
  bit_rate: string
  disposition: IDisposition
  tags: ITags
}

export interface IDisposition {
  default: number
  dub: number
  original: number
  comment: number
  lyrics: number
  karaoke: number
  forced: number
  hearing_impaired: number
  visual_impaired: number
  clean_effects: number
  attached_pic: number
  timed_thumbnails: number
  captions: number
  descriptions: number
  metadata: number
  dependent: number
  still_image: number
}

export interface ITags {
  BPS: string
  NUMBER_OF_FRAMES: string
  NUMBER_OF_BYTES: string
  _STATISTICS_WRITING_APP: string
  _STATISTICS_WRITING_DATE_UTC: string
  _STATISTICS_TAGS: string
  DURATION: string
}

export interface IMovieData {
  stream_id: number
  name: string
  added: string
  category_id: string
  container_extension: string
  custom_sid: string
  direct_source: string
}
