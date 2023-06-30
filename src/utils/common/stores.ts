/* eslint-disable no-unused-vars */
import type { TControllerRef } from './utils'
import { useMemo, useRef } from 'react'

//* ---- MobX store helpers ------------------------------ * //

export const useNewStore = <T, P>(
  Store: new (args: P) => T,
  args: P = {} as P,
  dependencies: [] = []
): T => useMemo(() => new Store(args), dependencies)

export const useGetController = <T>(store: { controller: T }): TControllerRef<T> => {
  const controller = useRef<T>()
  controller.current = store.controller
  return controller
}

export const setController = <T>(
  store: { controller: T },
  controllerRef?: TControllerRef<T>
): T => {
  const { controller } = store
  return controllerRef === undefined ? controller : (controllerRef.current = controller)
}
