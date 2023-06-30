/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IScrollRecord } from '#/store/app.store'

import { expect, describe, it } from 'vitest'

import AppStore from '#/store/app.store'

describe('AppStore', () => {
  const appStore = new AppStore()

  describe('setIsAppLoading', () => {
    it('should set isAppLoading to true', () => {
      appStore.setIsAppLoading(true)
      expect(appStore.state.isAppLoading).toEqual(true)
    })

    it('should set isAppLoading to false', () => {
      appStore.setIsAppLoading(false)
      expect(appStore.state.isAppLoading).toEqual(false)
    })
  })

  describe('setScroll', () => {
    it('should set the scroll position', () => {
      const scroll = { dir: 'down', pos: 100 } as IScrollRecord
      appStore.setScroll(scroll)
      expect(appStore.state.scroll).toEqual(scroll)
    })
  })

  describe('setViewport', () => {
    it('should set the viewport dimensions', () => {
      const viewport = {
        w: 1920,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: false,
        wider: true,
        widest: true
      }
      appStore.setViewport(viewport)
      expect(appStore.state.viewport).toEqual(viewport)
    })
  })

  describe('setTheme', () => {
    it('should set the theme to light', () => {
      const themeType = 'light'
      appStore.setTheme(themeType)
      expect(appStore.state.theme).toEqual(themeType)
    })

    it('should set the theme to dark', () => {
      const themeType = 'dark'
      appStore.setTheme(themeType)
      expect(appStore.state.theme).toEqual(themeType)
    })

    it('should set the theme to blue', () => {
      const themeType = 'blue'
      appStore.setTheme(themeType)
      expect(appStore.state.theme).toEqual(themeType)
    })
  })

  describe('updateScroll', () => {
    it('should update the scroll position', () => {
      appStore.updateScroll()
      expect(appStore.state.scroll.pos).not.toBeNull()
    })
  })

  describe('updateViewport', () => {
    it('should update the viewport dimensions', () => {
      appStore.updateViewport()
      expect(appStore.state.viewport).not.toBeNull()
    })
  })

  describe('addAxiosInterceptors', () => {
    it('should add interceptors to Axios', () => {
      appStore.addAxiosInterceptors()
      expect((axios.interceptors.response as any).handlers.length).toBeGreaterThan(0)
      expect((axios.interceptors.request as any).handlers.length).toBeGreaterThan(0)
    })
  })

  describe('switchTheme', () => {
    it('should switch the theme to the next theme', () => {
      appStore.setTheme('light')
      appStore.switchTheme()
      expect(appStore.state.theme).toEqual('dark')
      appStore.switchTheme()
      expect(appStore.state.theme).toEqual('blue')
      appStore.switchTheme()
      expect(appStore.state.theme).toEqual('light')
    })
  })

  describe('headerOpacity', () => {
    it('should calculate the opacity of the header', () => {
      const opacity = appStore.headerOpacity
      expect(opacity).not.toBeNull()
    })
  })

  describe('isOverFirstScreenHeight', () => {
    it('should return true if scrolled over the first screen height', () => {
      window.innerHeight = 100
      appStore.setScroll({ dir: null, pos: 150 })
      expect(appStore.isOverFirstScreenHeight).toEqual(true)
    })

    it('should return false if not scrolled over the first screen height', () => {
      window.innerHeight = 100
      appStore.setScroll({ dir: null, pos: 50 })
      expect(appStore.isOverFirstScreenHeight).toEqual(false)
    })
  })

  describe('isOverPostTitleHeight', () => {
    it('should return true if scrolled over the post title height', () => {
      appStore.setScroll({ dir: null, pos: 150 })
      expect(appStore.isOverPostTitleHeight).toEqual(true)
    })

    it('should return false if not scrolled over the post title height', () => {
      appStore.setScroll({ dir: null, pos: 50 })
      expect(appStore.isOverPostTitleHeight).toEqual(false)
    })
  })

  describe('isPadOrMobile', () => {
    it('should return true if viewport is a mobile or pad', () => {
      appStore.setViewport({
        w: 480,
        h: 800,
        mobile: true,
        pad: false,
        hpad: false,
        wider: false,
        widest: false
      })
      expect(appStore.isPadOrMobile).toEqual(true)
      appStore.setViewport({
        w: 768,
        h: 1024,
        mobile: false,
        pad: true,
        hpad: false,
        wider: false,
        widest: false
      })
      expect(appStore.isPadOrMobile).toEqual(true)
    })

    it('should return false if viewport is not a mobile or pad', () => {
      appStore.setViewport({
        w: 1920,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: true,
        wider: false,
        widest: false
      })
      expect(appStore.isPadOrMobile).toEqual(false)
      appStore.setViewport({
        w: 2560,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: false,
        wider: true,
        widest: false
      })
      expect(appStore.isPadOrMobile).toEqual(false)
    })
  })

  describe('isNarrowThanLaptop', () => {
    it('should return true if viewport is a pad or mobile or hpad', () => {
      appStore.setViewport({
        w: 480,
        h: 800,
        mobile: true,
        pad: false,
        hpad: false,
        wider: false,
        widest: false
      })
      expect(appStore.isNarrowThanLaptop).toEqual(true)
      appStore.setViewport({
        w: 768,
        h: 1024,
        mobile: false,
        pad: true,
        hpad: false,
        wider: false,
        widest: false
      })
      expect(appStore.isNarrowThanLaptop).toEqual(true)
      appStore.setViewport({
        w: 1100,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: true,
        wider: false,
        widest: false
      })
      expect(appStore.isNarrowThanLaptop).toEqual(true)
    })

    it('should return false if viewport is not a pad, mobile or hpad', () => {
      appStore.setViewport({
        w: 1920,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: false,
        wider: true,
        widest: false
      })
      expect(appStore.isNarrowThanLaptop).toEqual(false)
      appStore.setViewport({
        w: 2560,
        h: 1080,
        mobile: false,
        pad: false,
        hpad: false,
        wider: false,
        widest: true
      })
      expect(appStore.isNarrowThanLaptop).toEqual(false)
    })
  })

  describe('isAppLoading', () => {
    it('should return true if app is loading', () => {
      appStore.setIsAppLoading(true)
      expect(appStore.isAppLoading).toEqual(true)
    })

    it('should return false if app is not loading', () => {
      appStore.setIsAppLoading(false)
      expect(appStore.isAppLoading).toEqual(false)
    })
  })
})
