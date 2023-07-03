import { AUTH_KEY } from './constant'

export const isWindowExists = () => typeof window !== 'undefined'

export const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min

export const getUrlParam = (paramName: string): string | null =>
  new URLSearchParams(window.location.search).get(paramName)

export const getBearerToken = () => {
  return `Bearer ${localStorage.getItem(AUTH_KEY)}`
}

export const createMdWithExtension = (fileContent: string, extension: string) => {
  const allowExtension = [
    'sh',
    'xml',
    'yml',
    'yaml',
    'docker',
    'ts',
    'js',
    'json',
    'key',
    'pem',
    'cert'
  ]

  const isRewrite =
    !fileContent.startsWith('```') && allowExtension.find((f) => f.includes(extension))

  if (!isRewrite) return fileContent

  return '```' + extension + '\n' + fileContent + '```'
}
