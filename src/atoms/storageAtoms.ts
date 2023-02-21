import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { MMKV } from 'react-native-mmkv'
import { TMKKVKey } from '../storage'

const storage = new MMKV()

function getItem<T>(key: string): T | null {
  const value = storage.getString(key)
  try {
    if (value !== undefined) {
      const v = JSON.parse(value)
      return v
    } else {
      return null
    }
  } catch (e) {
    return value ? (value as T) : null
  }
}

function setItem<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value))
}

function removeItem(key: string): void {
  storage.delete(key)
}

function clearAll(): void {
  storage.clearAll()
}

export const atomWithMMKV = <T>(key: TMKKVKey, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    }))
  )
