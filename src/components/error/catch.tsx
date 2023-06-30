import type { ClassType, ComponentClass, ErrorInfo, ReactNode } from 'react'

import { Component } from 'react'

export function Catch<Props extends object>(
  component: IErrorHandlingComponent<Props>,
  errorHandler?: IErrorHandler
): ClassType<Props, Component<Props>, ComponentClass<Props>> {
  return class extends Component<Props, IErrorState> {
    static getDerivedStateFromError(error: Error): IErrorState {
      return { error }
    }

    constructor(props: Props) {
      super(props)

      this.state = {
        error: null
      }
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
      if (errorHandler) {
        errorHandler(error, info)
      }
    }

    render(): ReactNode {
      const { error } = this.state

      return component(this.props, error)
    }
  }
}

export type IErrorHandler = (error: Error, info: ErrorInfo) => void

export type IErrorHandlingComponent<Props> = (props: Props, error: Error | null) => ReactNode

export interface IErrorState {
  error: Error | null
}
