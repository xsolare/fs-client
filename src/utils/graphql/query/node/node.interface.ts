import type { Variables } from 'graphql-request'

export interface INodesBaseVariables extends Variables {
  uuid: string
}

export interface INodesReservesVariables extends Variables, INodesBaseVariables {
  reserveAt?: Date
  reserveTo?: Date
}
