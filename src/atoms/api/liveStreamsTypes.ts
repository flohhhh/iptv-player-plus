export interface ILiveStreamByCategoryId {
  num: number
  name: string
  stream_type: string
  stream_id: number
  stream_icon: string
  epg_channel_id: string
  added: string
  is_adult: string
  category_id: string
  category_ids: number[]
  custom_sid?: any
  tv_archive: number
  direct_source: string
  tv_archive_duration: string
}
