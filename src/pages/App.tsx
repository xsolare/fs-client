import type { IModalController } from '#/components/ui/modal/modal.store'
import ErrorBoundary from '#/components/error/error-boundary'
import DefaultLayout from '#/components/layouts/default/default.layout'
import { Modal } from '#/components/ui/modal/modal'
import { RootStoreProvider } from '#/contexts/root-store'
import ThemeProvider from '#/contexts/theme'
import { useAppInitialize } from '#/hooks/user-app-initialize.hook'
import { AppRoutes } from '#/utils/router'

const App = () => (
  <RootStoreProvider>
    <ErrorBoundary componentName="-">
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  </RootStoreProvider>
)

export default App

const AppContent = observer(() => {
  const modalRef = useRef<IModalController>()

  const isInit = useAppInitialize({ modalRef })

  return (
    <>
      {!!isInit && (
        <DefaultLayout>
          <AppRoutes />
        </DefaultLayout>
      )}
      <Modal controllerRef={modalRef} />
    </>
  )
})
