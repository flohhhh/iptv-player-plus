import { IAccountInfo } from '../api/types'

export interface IAccount {
  id: string
  host: string
  username: string
  password: string
  info?: IAccountInfo
}
