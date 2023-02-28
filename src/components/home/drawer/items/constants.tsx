import { TDrawerItemType } from '../types'
import { Movie } from '../../../../icons/Movie'
import { Search } from '../../../../icons/Search'
import { TvShow } from '../../../../icons/TvShow'
import { Canal } from '../../../../icons/Canal'
import { MyList } from '../../../../icons/MyList'
import { IIcon } from '../../../../icons/types'
import { FC } from 'react'

export const DEFAULT_SIZE = 14

export const iconByType: Record<TDrawerItemType, FC<IIcon>> = {
  search: Search,
  movies: Movie,
  series: TvShow,
  live: Canal,
  mylist: MyList,
}
