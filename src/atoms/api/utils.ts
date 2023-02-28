import { IAccount } from '../accounts/types'
import { TAction } from './types'

export const buildApiUrl = (
  account: IAccount,
  actions: TAction[] | null,
  strToReplace: string = ''
) => {
  const actionsQuery = actions
    ? `&action=${actions.join('&').replace('%sid%s', strToReplace)}`
    : ''

  const url = `${account.host}/player_api.php?username=${account.username}&password=${account.password}${actionsQuery}`
  return url
}

export type TTypeUrl = 'movie' | 'series' | 'live'
export const buildStreamUrl = (
  type: TTypeUrl,
  account: IAccount,
  mediaId: number
) => {
  return `${account.host}/${type}/${account.username}/${account.password}/${mediaId}.mkv`
}

export const fetchConfig = {
  headers: {
    Accept: '*/*',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_16_0) AppleWebKit/537.36 (KHTML, like Gecko) IPTVSmartersPro/1.1.1 Chrome/53.0.2785.143 Electron/1.4.16 Safari/537.36',
    'Accept-Language': 'fr',
  },
}
