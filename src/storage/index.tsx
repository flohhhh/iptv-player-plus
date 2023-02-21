import { MMKV } from 'react-native-mmkv'

const mmkvStorage = new MMKV()

export type TMKKVKey = 'profile.all' | 'profile.selected.id'

export const storage = () => ({
  set: (k: TMKKVKey, v: string) => {
    mmkvStorage.set(k, v)
  },
  get: (k: TMKKVKey) => {
    return mmkvStorage.getString(k)
  },
  setObj: <T extends object>(k: TMKKVKey, v: T) => {
    const valueStringify: string = JSON.stringify(v)
    if (valueStringify) {
      mmkvStorage.set(k, valueStringify)
    }
  },
  getObj: <T,>(k: TMKKVKey): T | undefined => {
    const strValue = mmkvStorage.getString(k)
    if (strValue !== undefined) {
      return JSON.parse(strValue) as T
    }
    return undefined
  },
})
