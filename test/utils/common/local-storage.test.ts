import type {
  ILocalStorageEntryName,
  ILocalStorageEntryValue,
  ILocalStorageEntryExpireAt
} from '../../../src/utils/common/local-storage'

import { expect, describe, it, beforeEach } from 'vitest'

import { LocalStorage } from '../../../src/utils/common/local-storage'

describe('LocalStorage class', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should set and get localStorage items without an expiration', () => {
    const name: ILocalStorageEntryName = 'test-item'
    const value: ILocalStorageEntryValue<string> = 'test-value'
    LocalStorage.setItem(name, value)
    expect(LocalStorage.getItem(name)).toBe(value)
  })

  it('should set and get localStorage items with an expiration', () => {
    const name: ILocalStorageEntryName = 'test-expiration-item'
    const value: ILocalStorageEntryValue<string> = 'test-value-expiration'
    const now = new Date()
    const expireAt: ILocalStorageEntryExpireAt = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    )

    LocalStorage.setItem(name, value, expireAt)
    expect(LocalStorage.getItem(name)).toBe(value)
  })

  it('should remove a localStorage item', () => {
    const name: ILocalStorageEntryName = 'test-remove-item'
    const value: ILocalStorageEntryValue<string> = 'test-value-remove'

    LocalStorage.setItem(name, value)
    LocalStorage.removeItem(name)

    expect(LocalStorage.getItem(name)).toBe(null)
  })
})
