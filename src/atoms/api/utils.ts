import { IAccount } from '../accountsAtom'
import { TAction } from './types'

export const buildPlayerUrl = (account: IAccount, action: TAction) => {
  return `${account.host}/player_api.php?username=${account.username}&password=${account.password}&action=${action}`
}

export const buildMovieUrl = (account: IAccount, mediaId: number) => {
  return `${account.host.replace('8080', '80')}/movie/${account.username}/${
    account.password
  }/${mediaId}.mkv`
}
