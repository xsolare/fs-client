import type { IButtonProps } from './button'
import { makeAutoObservable } from 'mobx'

export interface IButtonController {
  getState: () => IButtonState
}

export interface IButtonState {
  isDisabled: boolean
  isPending: boolean
  isVisible: boolean
}

export class ButtonStore {
  state: IButtonState = {
    isDisabled: false,
    isPending: false,
    isVisible: true
  }
  props = {} as IButtonProps

  constructor(props: IButtonProps) {
    const { ...rest } = props

    this.props = {
      ...rest
    }

    makeAutoObservable(this.state)
  }

  get stateGetter(): IButtonState {
    return {
      ...this.state
    }
  }
  controller: IButtonController = {
    getState: () => this.stateGetter
  }
}
