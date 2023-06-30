import type { IAuthDialogStoreController } from './auth.store'
import type { TControllerRef } from '@nord-clan/loc-track-ui-kit'
import type { FC } from 'react'

import { Tabs } from 'antd'
import { FaSignInAlt } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
import { SiGnuprivacyguard } from 'react-icons/si'

import { AuthDialogStore } from './auth.store'
import { DialogAuthStyled } from './auth.style'
import { SignIn } from './tabs/sign-in'
import { SignUp } from './tabs/sign-up'

interface IMapSelectProps {
  controllerRef: TControllerRef<IAuthDialogStoreController>
}

// Auth
//* ------------------------------------------------------------------------------------------ *//
const AuthDialog: FC<IMapSelectProps> = (props) => {
  const { controllerRef } = props

  const { userStore } = useAppStore()
  const store = useNewStore(AuthDialogStore, userStore)
  const controller = setController(store, controllerRef)

  return (
    <DialogAuthStyled store={store}>
      <Tabs
        onChange={store.clearState}
        centered
        defaultActiveKey="1"
        items={[
          {
            label: (
              <span>
                <FaSignInAlt />
                {` `}
                Авторизация
              </span>
            ),
            key: '1',
            children: <SignIn store={store} />
          },
          {
            label: (
              <span>
                <SiGnuprivacyguard />
                {` `}
                Регистрация
              </span>
            ),
            key: '2',
            children: <SignUp store={store} />
          }
        ]}
      />
      <div className="dialog-footer">
        <div className="close" onClick={() => controller.hide()}>
          <IoIosClose />
        </div>
      </div>
    </DialogAuthStyled>
  )
}

export default observer(AuthDialog)
