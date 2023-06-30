import type { FC, PropsWithChildren } from 'react'

import { useEffect } from 'react'

import Header from '#/components/header/header'
import { DefaultStyled } from '#/components/layouts/default/default.style'

// Default layout
//* ------------------------------------------------------------------------------------------ *//
const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  const { appStore } = useAppStore()

  useEffect(() => {
    appStore.updateViewport()
    appStore.updateScroll()
    window.onresize = () => appStore.updateViewport()
    window.onscroll = () => appStore.updateScroll()
  }, [])

  return (
    <>
      <DefaultStyled>{children}</DefaultStyled>
      <Header />
    </>
  )
}
export default DefaultLayout
