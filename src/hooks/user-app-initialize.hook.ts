import type { IModalController, TControllerRef } from '@nord-clan/loc-track-ui-kit'

import { store } from '#/store/common'

interface IInitialProps {
  modalRef: TControllerRef<IModalController>
}

// Initial setup
//* ------------------------------------------------------------------------------------------ *//
export const useAppInitialize = ({ modalRef }: IInitialProps): boolean => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const { appStore, userStore } = store

  useIsomorphicLayoutEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
      initialize()
    }
  }, [])

  const initialize = async () => {
    appStore.setIsAppLoading(true)

    appStore.setModalControllerRef(modalRef)
    // appStore.connectSocket()
    await userStore.me()
    appStore.setTheme(LocalStorage.getItem(THEME))
    appStore.addAxiosInterceptors()

    appStore.setIsAppLoading(false)
  }

  return !appStore.isAppLoading && !!isInitialized
}
