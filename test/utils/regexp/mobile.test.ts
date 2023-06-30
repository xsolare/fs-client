import { expect, describe, it } from 'vitest'

describe('matchIsMobile', () => {
  it('should return true for a mobile device user agent string', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1'
    const result = matchIsMobile(userAgent)
    expect(result).toEqual(true)
  })

  it('should return false for a desktop device user agent string', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
    const result = matchIsMobile(userAgent)
    expect(result).toEqual(false)
  })

  it('should return false for a truncated desktop device user agent string', () => {
    const userAgent = 'Wind' // the first 4 characters of a typical Windows desktop user agent string
    const result = matchIsMobile(userAgent)
    expect(result).toEqual(false)
  })
})
