import type { TControllerRef } from '#/utils/common/utils'
import type { IMenuDialogStoreController } from './menu.store'
import type { FC } from 'react'

import { Dialog } from '#/components/ui/dialog/dialog'
import { MenuDialogStore } from './menu.store'
import { MenuStyled } from './menu.style'

interface IMenuProps {
  controllerRef: TControllerRef<IMenuDialogStoreController>
}

// Menu component
//* ------------------------------------------------------------------------------------------ *//
const Menu: FC<IMenuProps> = observer((props) => {
  const { controllerRef } = props

  const store = useNewStore(MenuDialogStore)
  const controller = setController(store, controllerRef)
  const ref = useRef<HTMLDivElement>(null)

  const { handleClickLogout, handleClickProfile } = store
  const { isNotAnimate } = store.dialogParams
  const { isVisible, isLock } = store.dialogState

  useOutsideClick(ref, () => {
    controller.hide()
  })

  return (
    <Dialog store={store} isCustomStyle>
      <MenuStyled
        isLock={isLock}
        isNotAnimate={!!isNotAnimate}
        isVisible={isVisible}
        delay={200}
        ref={ref}>
        <div className="content">
          <div onClick={handleClickProfile}>
            <span>Профиль</span>
            {/* <BiCurrentLocation /> */}
          </div>

          <div onClick={handleClickLogout}>
            <span>Выйти</span>
            {/* <BiLogInCircle /> */}
          </div>
        </div>
        {/* <div className="content">
          <h3>{userStore?.user?.fullNameRu}</h3>
          <div>{userStore?.user?.city}</div>
          <div>{userStore?.user?.emailPrimary}</div>
          <div>{userStore?.user?.telegram}</div>
          <div>{userStore?.user?.employmentDate?.toString()}</div>
        </div>
        <div className="control">
        </div> */}
      </MenuStyled>
    </Dialog>
  )
})

export default Menu
