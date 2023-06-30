import type { ReactNode } from 'react'

import { configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { createContext } from 'react'

import { IRootStore } from '#/store/common/root-store'
import { isClientSide, isDev, isServerSide } from '#/utils/common/env'

enableStaticRendering(isServerSide())

configure({
  useProxies: 'always'
})

let $store: IRootStore
const StoreContext = createContext<IRootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export function useRootStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}
export const store = initializeStore()
export function RootStoreProvider({ children }: { children: ReactNode }) {
  if (isDev && isClientSide() && !window.Storage) {
    Object.defineProperty(window, 'Storage', {
      get() {
        return store
      }
    })
    Object.defineProperty(window, 'store', {
      get() {
        return store
      }
    })
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function initializeStore(): IRootStore {
  const _store = $store ?? new IRootStore()

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!$store) $store = _store

  return _store
}
