import type { TControllerRef } from '#/utils/common/utils'
import type { IButtonController } from './button.store'
import type { ForwardedRef } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { forwardRef } from 'react'
import { setController, useNewStore } from '#/utils/common/stores'
import { ButtonStore } from './button.store'
import { ButtonStyled } from './button.style'

export interface IButtonProps {
  onClick: (controller: IButtonController, e: React.MouseEvent) => void
  text?: string
  controllerRef?: TControllerRef<IButtonController>
  className?: string
}

export const Button = observer(
  forwardRef(function Button(props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    const { controllerRef, ...rest } = props

    const store = useNewStore(ButtonStore, rest)
    const controller = setController(store, controllerRef)

    const { onClick, text, className } = store.props

    return (
      <ButtonStyled
        ref={ref}
        onClick={(e) => onClick(controller, e)}
        className={cn('button', className)}>
        <span className="button-text">{text}</span>
      </ButtonStyled>
    )
  })
)
