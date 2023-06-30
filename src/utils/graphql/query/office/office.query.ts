import type { IOffice } from '#/types/models/office.interface'
import type { IOfficeBaseVariables } from './office.interface'
import type { HandleGQL } from '../..'

import { ALL_OFFICE_NESTED, OFFICE_WITH_LAYERS } from './office.gql'

export const OfficeQuery = (handleGQL: HandleGQL) => ({
  allByOfficeId: (variables: IOfficeBaseVariables) => {
    return handleGQL<IOffice>(ALL_OFFICE_NESTED, variables)
  },
  officeWithLayers: (variables: IOfficeBaseVariables) => {
    return handleGQL<IOffice>(OFFICE_WITH_LAYERS, variables)
  }
})
