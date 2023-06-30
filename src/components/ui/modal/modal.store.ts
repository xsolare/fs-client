import type { IButtonProps } from '../button/button'
import type { IButtonController } from '../button/button.store'
import type { ElementType, ReactNode } from 'react'
import { makeObservable, observable } from 'mobx'
import { BiLoader } from 'react-icons/bi'
import { BaseDialogStore } from '../dialog/dialog.store'

export enum ModalType {
  'CONFIRM',
  'ALERT',
  'PROCESSING'
}

export interface IModalController {
  hide: () => void
  showLoader: (message?: string) => void
  showWarning: (params: ShowAlertTypedParams) => void
  showError: (params: ShowAlertTypedParams) => void
  showSuccess: (params: ShowAlertTypedParams) => void
  showInfo: (params: ShowAlertTypedParams) => void
  showCustomDialog: (params: IShowCustomDialogParams) => void
  showConfirm: (params: IShowConfirmParams) => void
}

export type DialogButtonParams = Omit<IButtonProps, 'onClick'> & {
  onClick: (
    modalController: IModalController,
    buttonController: IButtonController,
    e: React.MouseEvent
  ) => void
}

export enum AlertType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info',
  Processing = 'processing'
}

interface IShowDialogParams {
  Icon?: ElementType
  message: ReactNode
  headerText?: string
  maxWidth?: number
  alertType?: AlertType
}

export interface IShowAlertParams extends IShowDialogParams {
  okText?: string
  okClick?: (
    modalController: IModalController,
    buttonController: IButtonController,
    e: React.MouseEvent
  ) => void
}

export type ShowAlertTypedParams = Omit<IShowAlertParams, 'alertType'>

export interface IShowConfirmParams extends IShowAlertParams {
  cancelText?: string
  cancelClick?: (
    modalController: IModalController,
    buttonController: IButtonController,
    e: React.MouseEvent
  ) => void
}

export interface IShowCustomDialogParams extends IShowDialogParams {
  buttons: DialogButtonParams[]
}

type ShowModalParams = Omit<IShowDialogParams, 'alertType'> & {
  type: ModalType
  buttons: IButtonProps[]
  alertType: AlertType
}

export class ModalStore extends BaseDialogStore {
  showParams = {} as ShowModalParams

  showKey = Math.random()

  headerNames = {
    warning: 'Внимание!',
    error: 'Ошибка!',
    success: 'Успех',
    info: 'Информация',
    processing: 'Cообщение системы'
  }

  controller: IModalController

  constructor() {
    super({ isOutsideClick: false })
    this.showParams.buttons = []

    makeObservable(this, {
      showKey: observable
    })

    this.controller = this.getController()
  }

  showModal = (params: ShowModalParams): void => {
    this.showParams = params
    this.showKey = Math.random()
    this.showDialog()
  }

  showCustomDialog = (params: IShowCustomDialogParams): void => {
    const _buttons = [] as IButtonProps[]

    const { buttons, alertType, ...rest } = params

    _buttons.push(
      ...buttons.map((f) => {
        const { onClick, ...args } = f
        return {
          ...args,
          onClick: (buttonController: IButtonController, e: React.MouseEvent) => {
            onClick(this.controller, buttonController, e)
          }
        }
      })
    )

    this.showModal({
      ...rest,
      alertType: alertType || AlertType.Info,
      type: ModalType.ALERT,
      buttons: _buttons
    })
  }

  getHeaderByType = (alertType: AlertType): string =>
    this.showParams.headerText || this.headerNames[alertType]

  showAlert = (params: IShowAlertParams): void => {
    const { okClick, okText, alertType, ...rest } = params
    this.showModal({
      ...rest,
      type: ModalType.ALERT,
      alertType: alertType || AlertType.Warning,
      buttons: [
        {
          text: okText || 'Ok',
          onClick: (buttonStore, e) => {
            if (okClick) {
              okClick(this.controller, buttonStore, e)
            } else {
              this.hideDialog()
            }
          }
        }
      ]
    })
  }

  showWarning = (params: Omit<IShowAlertParams, 'alertType'>): void =>
    this.showAlert({ ...params, alertType: AlertType.Warning })

  showError = (params: Omit<IShowAlertParams, 'alertType'>): void =>
    this.showAlert({ ...params, alertType: AlertType.Error })

  showSuccess = (params: Omit<IShowAlertParams, 'alertType'>): void =>
    this.showAlert({ ...params, alertType: AlertType.Success })

  showInfo = (params: Omit<IShowAlertParams, 'alertType'>): void =>
    this.showAlert({ ...params, alertType: AlertType.Info })

  showConfirm = (params: IShowConfirmParams): void => {
    const { okClick, okText, cancelClick, cancelText, alertType, ...rest } = params
    this.showModal({
      ...rest,
      type: ModalType.CONFIRM,
      alertType: alertType || AlertType.Warning,
      buttons: [
        {
          text: cancelText || 'Отмена',
          onClick: (buttonStore, e) => {
            if (cancelClick) {
              cancelClick(this.controller, buttonStore, e)
            } else {
              this.hideDialog()
            }
          }
        },
        {
          text: okText || 'Ok',
          onClick: (buttonStore, e) => {
            if (okClick) {
              okClick(this.controller, buttonStore, e)
            } else {
              this.hideDialog()
            }
          }
        }
      ]
    })
  }

  showLoader = (message = 'Обработка данных...'): void => {
    this.showModal({
      Icon: BiLoader,
      message,
      alertType: AlertType.Processing,
      type: ModalType.PROCESSING,
      buttons: []
    })
  }

  getController = (): IModalController => {
    return {
      hide: () => this.hideDialog(),
      showLoader: (message) => this.showLoader(message),
      showConfirm: (params) => this.showConfirm(params),
      showCustomDialog: (params) => this.showCustomDialog(params),
      showError: (params) => this.showError(params),
      showInfo: (params) => this.showInfo(params),
      showSuccess: (params) => this.showSuccess(params),
      showWarning: (params) => this.showWarning(params)
    }
  }
}
