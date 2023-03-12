import { IGenericByCategory } from './types'

export interface ISerie extends IGenericByCategory {
  series_id: number
  cover: string
  plot: string
  cast: string
  director: string
  genre: string
  releaseDate: string
  last_modified: string
  backdrop_path: any[]
  youtube_trailer: string
  episode_run_time: string
}

export interface ISerieInfo {
  seasons: Season[]
  info: Info
  episodes: Record<string, Episode>
}

interface Season {
  name: string
  episode_count: string
  overview: string
  air_date: string
  cover: string
  cover_tmdb: string
  season_number: number
  cover_big: string
  releaseDate: string
  duration: string
}

export interface Info {
  name: string
  cover: string
  plot: string
  cast: string
  director: string
  genre: string
  releaseDate: string
  last_modified: string
  rating: string
  rating_5based: number
  backdrop_path: any[]
  youtube_trailer: string
  episode_run_time: string
  category_id: string
}

export interface Disposition {
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

export interface Tags {
  BPS: string
  NUMBER_OF_FRAMES: string
  NUMBER_OF_BYTES: string
  _STATISTICS_WRITING_APP: string
  _STATISTICS_WRITING_DATE_UTC: string
  _STATISTICS_TAGS: string
  DURATION: string
  'BPS-eng': string
  'DURATION-eng': string
  'NUMBER_OF_FRAMES-eng': string
  'NUMBER_OF_BYTES-eng': string
  '_STATISTICS_WRITING_APP-eng': string
  '_STATISTICS_WRITING_DATE_UTC-eng': string
  '_STATISTICS_TAGS-eng': string
}

export interface Video {
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
  disposition: Disposition
  tags: Tags
}

export interface Disposition2 {
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

export interface Tags2 {
  language: string
  title: string
  BPS: string
  NUMBER_OF_FRAMES: string
  NUMBER_OF_BYTES: string
  _STATISTICS_WRITING_APP: string
  _STATISTICS_WRITING_DATE_UTC: string
  _STATISTICS_TAGS: string
  DURATION: string
  'BPS-eng': string
  'DURATION-eng': string
  'NUMBER_OF_FRAMES-eng': string
  'NUMBER_OF_BYTES-eng': string
  '_STATISTICS_WRITING_APP-eng': string
  '_STATISTICS_WRITING_DATE_UTC-eng': string
  '_STATISTICS_TAGS-eng': string
}

export interface Audio {
  index: number
  codec_name: string
  codec_long_name: string
  profile: string
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
  extradata_size: number
  disposition: Disposition2
  tags: Tags2
}

export interface Info2 {
  duration_secs: number
  duration: string
  video: Video
  audio: Audio
  bitrate: number
}

export interface Episode {
  id: string
  episode_num: number
  title: string
  container_extension: string
  info: Info2
  custom_sid: string
  added: string
  season: number
  direct_source: string
}
