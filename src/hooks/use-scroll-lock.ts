import { useCallback, useRef } from 'react'
import { useIsomorphicLayoutEffect } from './events/use-isomorphic-layout-effect'

function isiOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

export const useScrollLock = () => {
  const scrollOffset = useRef(0)

  const lockScroll = useCallback(() => {
    document.body.dataset.scrollLock = 'true'
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = 'var(--scrollbar-compensation)'

    if (isiOS()) {
      scrollOffset.current = window.pageYOffset
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollOffset.current}px`
      document.body.style.width = '100%'
    }
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    if (isiOS()) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollOffset.current)
    }

    delete document.body.dataset.scrollLock
  }, [])

  const switchLock = (value: boolean) => {
    if (value) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }

  useIsomorphicLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
    document.body.style.setProperty('--scrollbar-compensation', `${scrollBarCompensation}px`)
  }, [])

  return {
    switchLock,
    lockScroll,
    unlockScroll
  }
}
