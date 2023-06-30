import type UserStore from '#/store/user.store'

import { BaseDialogStore } from '@nord-clan/loc-track-ui-kit'
import { RiErrorWarningLine } from 'react-icons/ri'

export interface IAuthDialogStoreController {
  show: () => void
  hide: () => void
}

interface IAuthDialogStoreState {
  login: string
  password: string
}

export class AuthDialogStore extends BaseDialogStore {
  private _userStore: UserStore

  private _state: IAuthDialogStoreState = {
    login: '',
    password: ''
  }

  constructor(userStore: UserStore) {
    super()

    this._userStore = userStore

    makeObservable(this._state, {
      login: observable,
      password: observable
    })
    makeObservable(this, {
      setLogin: action,
      setPassword: action
    })
  }

  clearState = () => {
    this._state.login = ''
    this._state.password = ''
  }

  setLogin = (value: string) => {
    this._state.login = value
  }

  setPassword = (value: string) => {
    this._state.password = value
  }

  get state() {
    return this._state
  }

  get validated() {
    return this.state.login && this.state.password
  }

  signIn = async (): Promise<void> => {
    if (!this.validated) return

    try {
      store.appStore.modal.showLoader()
      const { data } = await graphql.mutation.user.sigIn(this.state)
      this._userStore.setUser(data.user)
      this._userStore.saveCredential(data)
      this.hideDialog()
      store.appStore.modal.hide()
    } catch (e) {
      store.appStore.modal.showWarning({ message: 'Некорректные данные', Icon: RiErrorWarningLine })
      console.log('>', e)
    } finally {
      this.clearState()
    }
  }

  signUp = async (): Promise<void> => {
    if (!this.validated) return

    try {
      store.appStore.modal.showLoader()
      const { data } = await graphql.mutation.user.sigUp(this.state)
      this._userStore.setUser(data.user)
      this._userStore.saveCredential(data)
      this.hideDialog()
      store.appStore.modal.hide()
    } catch (e) {
      store.appStore.modal.showWarning({ message: 'Некорректные данные', Icon: RiErrorWarningLine })
      console.log('>', e)
    } finally {
      this.clearState()
    }
  }

  controller: IAuthDialogStoreController = {
    show: this.showDialog,
    hide: this.hideDialog
  }
}
