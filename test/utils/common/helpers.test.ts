import { expect, describe, it } from 'vitest'

import { getUrlParam, randomNum } from '../../../src/utils/common'

describe('randomNum function', () => {
  it('should return a number within the range', () => {
    const result = randomNum(5, 10)
    expect(result).to.be.at.least(5)
    expect(result).to.be.at.most(10)
  })

  it('should return an integer', () => {
    const result = randomNum(0, 100)
    expect(result).to.be.an('number')
    expect(result).to.equal(Math.floor(result))
  })

  it('should return the same number if min and max are equal', () => {
    const result = randomNum(0, 0)
    expect(result).to.equal(0)
  })
})

describe('getUrlParam', () => {
  it('should return null when param is not found', () => {
    expect(getUrlParam('nonExistParam')).toEqual(null)
  })

  it('should return correct value when param is found', () => {
    const search = '?name=john&age=30'
    Object.defineProperty(window, 'location', { value: { search } })

    expect(getUrlParam('name')).toEqual('john')
    expect(getUrlParam('age')).toEqual('30')
  })
})
