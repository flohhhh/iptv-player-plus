import { buildApiUrl, fetchConfig } from './utils'
import { IAccount } from '../accounts/types'

export const useAccountInfo = () => {
  const fetchAsync = async (account: IAccount) => {
    return await fetch(buildApiUrl(account, null), fetchConfig)
  }

  return { fetch: fetchAsync }
}
