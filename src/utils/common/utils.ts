import type { MutableRefObject } from 'react'
import { v4 } from 'uuid'

export type TControllerRef<T> = MutableRefObject<T | undefined>
export type Size = 's' | 'm' | 'l'
export const getId = (): string => {
  let uuid = v4()
  const possible = 'abcdef'
  uuid = uuid.replace(uuid.charAt(0), possible.charAt(Math.floor(Math.random() * possible.length)))
  return uuid
}

//* ---- just helpers ------------------------------ * //
export interface IDictionary<T> {
  [key: string]: T
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isObject(value: unknown): value is object {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

export function isBoolean(value: unknown): value is boolean {
  return value != null && typeof value === 'boolean'
}

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function combineArrays<T>(...arrays: (T[] | undefined)[]): T[] {
  const combined: T[] = []
  arrays.forEach((a) => a?.forEach((v) => v && combined.push(v)))
  return combined
}
