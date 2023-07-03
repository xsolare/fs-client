import type { ThemeVarious } from '#/contexts/theme'
import type { IAuthDialogStoreController } from './dialog/auth/auth.store'
import type { IMenuDialogStoreController } from './dialog/menu/menu.store'
import type { FC } from 'react'

import cn from 'classnames'
import { BiSearchAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { GiSun, GiNightSleep } from 'react-icons/gi'
import { IoMdRainy } from 'react-icons/io'
import { RiErrorWarningLine } from 'react-icons/ri'

import AuthDialog from './dialog/auth/auth'
import MenuDialog from './dialog/menu/menu'
import { HeaderStyled } from './header.style'

const themeIcon = new Map<ThemeVarious, JSX.Element>([
  ['light', <GiSun key={1} />],
  ['dark', <GiNightSleep key={2} />],
  ['blue', <IoMdRainy key={3} />]
])

// Header component
//* ------------------------------------------------------------------------------------------ *//
const Header: FC = observer(() => {
  const { userStore, appStore } = useAppStore()
  const {
    state: { theme, mountUrl },
    switchTheme,
    modal
  } = appStore
  const { isAuth } = userStore

  const authControllerRef = useRef<IAuthDialogStoreController>()
  const menuControllerRef = useRef<IMenuDialogStoreController>()

  const handleClickAuth = () => {
    authControllerRef.current?.show()
  }

  const handleClickProfile = () => {
    menuControllerRef.current?.show({ userStore })
  }

  return (
    <>
      <HeaderStyled>
        <div className="mount-path">
          <input value={mountUrl} />
        </div>
        <div className="control">
          <span
            onClick={() =>
              modal.showWarning({ message: 'Не реализовано', Icon: RiErrorWarningLine })
            }>
            <BiSearchAlt />
          </span>
          <span onClick={switchTheme}>{themeIcon.get(theme)}</span>
          {!isAuth ? (
            <div className="profile" onClick={handleClickAuth}>
              <CgProfile />
            </div>
          ) : (
            <div className={cn('profile', { isAuth })} onClick={handleClickProfile}>
              <div>{'initials'}</div>
            </div>
          )}
        </div>
      </HeaderStyled>
      <MenuDialog controllerRef={menuControllerRef} />
      <AuthDialog controllerRef={authControllerRef} />
    </>
  )
})

export default Header
