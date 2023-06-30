import { action, computed, makeObservable, observable } from 'mobx'

export interface IBaseDialogStoreParams {
  delay?: number
  isNotAnimate?: boolean
  isOutsideClick?: boolean
}

interface IBaseDialogStoreState {
  isVisible: boolean
  isLock: boolean
}

export class BaseDialogStore {
  private __params: IBaseDialogStoreParams
  private __timeout: ReturnType<typeof setTimeout> | null

  __state: IBaseDialogStoreState = {
    isVisible: false,
    isLock: false
  }

  constructor(params?: IBaseDialogStoreParams) {
    this.__params = {
      ...params,
      isOutsideClick: params?.isOutsideClick ?? true,
      isNotAnimate: params?.isNotAnimate ?? false
    }

    makeObservable(this, {
      setIsVisible: action,
      setIsLock: action,
      lockDialog: action,
      isDialogHidden: computed
    })

    makeObservable(this.__state, {
      isVisible: observable,
      isLock: observable
    })
  }

  setIsVisible = (isVisible: boolean): boolean => (this.__state.isVisible = isVisible)

  setIsLock = (isLock: boolean): boolean => (this.__state.isLock = isLock)

  switchVisible = (): void => (this.__state.isVisible ? this.hideDialog() : this.showDialog())

  lockDialog = (): void => {
    this.setIsLock(true)
    const delay = !this.isDialogNotAnimate ? this.__params?.delay ?? 250 : 0

    if (this.__timeout) {
      clearTimeout(this.__timeout)
      this.__timeout = null
    }

    this.__timeout = setTimeout(() => {
      this.setIsLock(false)
      this.setIsVisible(false)
    }, delay)
  }

  showDialog = (): void => {
    this.setIsVisible(true)
  }

  hideDialog = (withoutLock?: boolean): void => {
    const { isVisible, isLock } = this.__state

    if (!isVisible || isLock) {
      return
    }

    if (withoutLock) {
      this.setIsVisible(false)
    } else {
      this.lockDialog()
    }
  }

  get isVisible(): boolean {
    return this.__state.isVisible
  }

  get isDialogHidden(): boolean {
    return !this.__state.isLock && !this.__state.isVisible
  }

  get isDialogNotAnimate(): boolean {
    return !!this.__params?.isNotAnimate
  }

  get isDialogOutsideClick(): boolean {
    return !!this.__params?.isOutsideClick
  }

  get dialogState() {
    return this.__state
  }

  get dialogParams() {
    return this.__params
  }
}
