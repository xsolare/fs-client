import { AUTH_KEY } from './constant'

export const isWindowExists = () => typeof window !== 'undefined'

export const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min

export const getUrlParam = (paramName: string): string | null =>
  new URLSearchParams(window.location.search).get(paramName)

export const getBearerToken = () => {
  return `Bearer ${localStorage.getItem(AUTH_KEY)}`
}
