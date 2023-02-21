export type TAction =
  | 'get_vod_categories'
  | 'get_vod_streams'
  | 'get_vod_info'
  | 'vod_id=%sid%s'
  | 'category_id=%sid%s'
  | 'get_series_categories'
  | 'get_series'
  | 'get_live_categories'
  | 'get_live_streams'

export interface ICategory {
  category_id: string
  category_name: string
  parent_id: number
}
