import type { IModalController } from '#/components/ui/modal/modal.store'
import type { ThemeVarious } from '#/contexts/theme'
import type { TControllerRef } from '#/utils/common/utils'
import type { AxiosInstance } from 'axios'
import type { Socket } from 'socket.io-client'

import axios from 'axios'
import { VscBracketError } from 'react-icons/vsc'

interface IAppStoreState {
  theme: ThemeVarious
  scroll: IScrollRecord
  viewport: IViewportRecord
  mediaType: 'screen' | 'print'
  isAppLoading: boolean
}

//* ---- App store ------------------------------------------------------------- *//
export default class AppStore {
  private _modalDialogControllerRef = {} as TControllerRef<IModalController>
  private _socket: Socket

  state: IAppStoreState = {
    theme: 'light',
    scroll: {} as IScrollRecord,
    viewport: {} as IViewportRecord,
    mediaType: 'screen',
    isAppLoading: true
  }

  constructor() {
    // this._socket = io('ws://localhost:8080')

    makeObservable(this, {
      // ~ action
      setScroll: action,
      setViewport: action,
      setTheme: action,
      // ~ computed
      headerOpacity: computed,
      isOverFirstScreenHeight: computed,
      isOverPostTitleHeight: computed,
      isPadOrMobile: computed,
      isNarrowThanLaptop: computed
    })

    makeAutoObservable(this.state)
  }

  setIsAppLoading = (value: boolean): boolean => (this.state.isAppLoading = value)
  setScroll = (scroll: IScrollRecord): IScrollRecord => (this.state.scroll = scroll)
  setViewport = (viewport: IViewportRecord): IViewportRecord => (this.state.viewport = viewport)
  setTheme = (themeType: ThemeVarious | null): ThemeVarious => {
    localStorage.setItem(THEME, themeType || 'light')
    return (this.state.theme = themeType || 'light')
  }
  setModalControllerRef = (
    ref: TControllerRef<IModalController>
  ): TControllerRef<IModalController> => (this._modalDialogControllerRef = ref)

  connectSocket = () => {
    try {
      this._socket.connect()
    } catch (e) {
      console.log('> socket error', e)
    }
  }

  updateScroll(): void {
    const { pageYOffset } = window

    this.setScroll({
      dir: null,
      pos: pageYOffset
    })
  }

  updateViewport(): void {
    const { innerHeight } = window
    const { width } = document.documentElement.getBoundingClientRect()
    const { hpad, pad, mobile, h, w } = this.state.viewport

    if (
      h &&
      // chrome mobile delta == 56
      Math.abs(innerHeight - h) < 80 &&
      width === w &&
      (hpad || pad || mobile)
    ) {
      return
    }
    this.setViewport({
      w: width,
      h: innerHeight,
      mobile: window.screen.width <= 568 || window.innerWidth <= 568,
      pad: window.innerWidth <= 768 && window.innerWidth > 568,
      hpad: window.innerWidth <= 1100 && window.innerWidth > 768,
      wider: window.innerWidth > 1100 && window.innerWidth < 1920,
      widest: window.innerWidth >= 1920
    })
  }

  //* Axios
  addAxiosInterceptors = (istance?: AxiosInstance): void => {
    const _axios = istance ?? axios

    _axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 404) {
          this.modal?.showError({
            Icon: VscBracketError,
            maxWidth: 700,
            message:
              error?.response?.data?.message || error?.response?.data?.detail || error.toString()
          })
        } else {
          this.modal?.showError({
            Icon: VscBracketError,
            maxWidth: 700,
            message:
              error?.response?.data?.message || error?.response?.data?.detail || error.toString()
          })
        }
        return Promise.reject(error)
      }
    )

    _axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  switchTheme = (): void => {
    const arr: ThemeVarious[] = ['blue', 'light', 'dark']
    const i = arr.indexOf(this.state.theme)
    this.setTheme(arr[i === arr.length - 1 ? 0 : i + 1])
  }

  get headerOpacity(): number {
    const { pos } = this.state.scroll
    const threshold = 100

    const opacity = pos >= threshold ? 0 : 1 - Math.floor((pos / threshold) * 100) / 100

    return isNaN(opacity) ? 1 : opacity
  }

  get isOverFirstScreenHeight(): boolean {
    const { pos } = this.state.scroll

    if (!isClientSide()) {
      return false
    }
    return pos > window.innerHeight || pos > screen.height
  }

  get isOverPostTitleHeight(): boolean {
    const { pos } = this.state.scroll

    if (!isClientSide()) {
      return false
    }

    return pos > 126 || pos > screen.height / 3
  }

  get isPadOrMobile(): boolean {
    const { pad, mobile } = this.state.viewport

    return pad || mobile
  }

  get isNarrowThanLaptop(): boolean {
    return this.isPadOrMobile || this.state.viewport.hpad
  }

  get isAppLoading(): boolean {
    return this.state.isAppLoading
  }

  get modal(): IModalController | undefined {
    return this._modalDialogControllerRef.current
  }

  get socket(): Socket {
    return this._socket
  }
}

//* ---- Types ------------------------------------------------------------- *//

export interface IViewportRecord {
  w: number
  h: number
  mobile: boolean
  pad: boolean
  hpad: boolean
  wider: boolean
  widest: boolean
}

export interface IScrollRecord {
  dir: 'up' | 'down' | null
  pos: number
}
