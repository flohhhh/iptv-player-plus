export type TAction =
  | 'get_vod_categories'
  | 'get_vod_streams'
  | 'get_vod_info'
  | 'vod_id=%sid%s'
  | 'category_id=%sid%s'
  | 'get_series_categories'
  | 'get_series'
  | 'get_series_info'
  | 'series_id=%sid%s'
  | 'get_live_categories'
  | 'get_live_streams'

export interface ICategory {
  category_id: string
  category_name: string
  parent_id: number
}

export interface IAccountInfo {
  user_info: IUserInfo
  server_info: IServerInfo
}

interface IUserInfo {
  username: string
  password: string
  message: string
  auth: number
  status: string
  exp_date: string
  is_trial: string
  active_cons: string
  created_at: string
  max_connections: string
  allowed_output_formats: string[]
}
interface IServerInfo {
  url: string
  port: string
  https_port: string
  server_protocol: string
  rtmp_port: string
  timezone: string
  timestamp_now: number
  time_now: string
}

export interface IGenericByCategory {
  num: number
  name: string
  rating: string
  rating_5based: number
  category_id: string
  tmdb_id: string
}
