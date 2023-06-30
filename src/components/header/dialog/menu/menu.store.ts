/* eslint-disable @typescript-eslint/no-unused-vars */
import type UserStore from '#/store/user.store'
import { BaseDialogStore, type IBaseDialogStoreParams } from '#/components/ui/dialog/dialog.store'

export interface IMenuStoreShowParams {
  userStore: UserStore
}

export type IMenuStoreParams = IBaseDialogStoreParams

export interface IMenuDialogStoreController {
  show: (showParams: IMenuStoreShowParams) => void
  hide: () => void
}

export class MenuDialogStore extends BaseDialogStore {
  showParams = {} as IMenuStoreShowParams

  constructor(params?: IMenuStoreParams) {
    super(params)
  }

  handleClickProfile = (_: React.MouseEvent): void => {
    const { userStore } = this.showParams

    this.hideDialog()
  }

  handleClickLogout = (_: React.MouseEvent): void => {
    const { logout } = this.showParams.userStore
    logout()
    this.hideDialog()
  }

  controller: IMenuDialogStoreController = {
    show: (showParams: IMenuStoreShowParams) => {
      this.showParams = showParams
      this.showDialog()
    },
    hide: this.hideDialog
  }
}
