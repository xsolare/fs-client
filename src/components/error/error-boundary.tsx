import type { FC, PropsWithChildren, ReactElement } from 'react'

import { TbFaceIdError } from 'react-icons/tb'

import { Catch } from './catch'
import './error.css'

export type ErrorBoundaryProps = PropsWithChildren<{
  componentName: string
}>

const ErrorBoundary: FC<ErrorBoundaryProps> = (props, error: Error | null): ReactElement => {
  const { children, componentName } = props

  if (error) {
    const { message } = error

    return (
      <div className="error">
        <TbFaceIdError />
        <div>
          <span>Smth wrong</span> {componentName}
        </div>
        <div>
          <span>Error message</span> {message}
        </div>
        <div className="footer">reload page for fix</div>
      </div>
    )
  }

  /* eslint-disable react/jsx-no-useless-fragment */
  return <>{children}</>
}

export default Catch(ErrorBoundary)
