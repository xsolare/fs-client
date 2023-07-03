import type { TControllerRef } from '#/utils/common/utils'
import type { IModalController } from './modal.store'
import type { CSSProperties, FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import { setController, useNewStore } from '#/utils/common/stores'
import { Button } from '../button/button'
import { Dialog } from '../dialog/dialog'
import { ModalStore } from './modal.store'
import { ModalStyled } from './modal.style'

interface IModalProps {
  controllerRef: TControllerRef<IModalController>
  zIndex?: number
}

const Modal: FC<IModalProps> = observer(({ controllerRef, zIndex = 999 }) => {
  const store = useNewStore(ModalStore)

  if (!controllerRef) {
    controllerRef = useRef<IModalController>()
  }
  setController(store, controllerRef)

  const modalStyle = { zIndex } as CSSProperties

  const { showParams, showKey, getHeaderByType } = store
  const { Icon, alertType, message, buttons } = showParams

  return (
    <Dialog store={store}>
      <ModalStyled key={showKey} style={modalStyle}>
        <div className={cn('modal-content', `alert-${alertType}`)}>
          <h2 className="modal-header">
            <span className="header-modal-promt">{getHeaderByType(alertType)}</span>
            {!!Icon && (
              <span className="icon-wrapper">
                <Icon />
              </span>
            )}
          </h2>
          <p className="modal-promt">{message}</p>
          {buttons.length !== 0 ? (
            <div className="modal-footer">
              {buttons.map((buttonProps, idx) => (
                <Button key={`btn${idx}`} {...buttonProps} />
              ))}
            </div>
          ) : null}
        </div>
      </ModalStyled>
    </Dialog>
  )
})

export { Modal }
