import type { IPoint } from '@nord-clan/loc-track-ui-kit'

export interface ICreateNodeVariables {
  angle?: number
  height: number
  width: number
  layerId: string
  type?: string
  pos: IPoint
}

export interface IUpdateNodeVariables {
  id: string
  angle?: number
  pos?: IPoint
  height?: number
  width?: number
}
