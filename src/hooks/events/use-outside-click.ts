/* eslint-disable no-unused-vars */
import type { RefObject } from 'react'
import { useEventListener } from './use-event-listener'

type Handler = (event: MouseEvent) => void

export const useOutsideClick = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void => {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current

    if (!el || el.contains(event.target as Node)) {
      return
    }

    handler(event)
  })
}
