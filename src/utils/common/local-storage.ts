export const TaskEvalutionKey = 'EVALUTION'

export type ILocalStorageEntryName = string
export type ILocalStorageEntryValue<T> = T
export type ILocalStorageEntryExpireAt = Date

export interface ILocalStorageEntry<T> {
  value: ILocalStorageEntryValue<T>
  expireAt?: ILocalStorageEntryExpireAt
}

export class LocalStorage {
  private static get _storage(): Storage | undefined {
    return window?.localStorage
  }

  static getItem<T>(name: ILocalStorageEntryName): T | null {
    const entry = this._storage?.getItem(name)
    if (!entry) {
      return null
    }

    try {
      const data: ILocalStorageEntry<T> = JSON.parse(entry)

      const { value, expireAt } = data
      if (expireAt && new Date() > new Date(expireAt)) {
        this._storage?.removeItem(name)
        return null
      }

      return value
    } catch (_) {
      return entry ? (entry as unknown as T) : null
    }
  }

  static setItem<T>(
    name: ILocalStorageEntryName,
    value: ILocalStorageEntryValue<T>,
    expireAt?: ILocalStorageEntryExpireAt
  ): void {
    this._storage?.setItem(
      name,
      JSON.stringify({
        value,
        expireAt: expireAt?.getTime()
      })
    )
  }

  static removeItem(name: ILocalStorageEntryName): void {
    this._storage?.removeItem(name)
  }

  static removeExpiredItems() {
    Object.keys(localStorage).forEach((key) => this.getItem(key))
  }
}
