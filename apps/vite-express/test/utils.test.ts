import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as utils from '../src/utils/index'

describe('工具类测试', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  it('removeObjectProperty -> 移除对象指定的key/value', () => {
    const target = {
      a: 1,
      b: 2,
    }
    const removeTarget = utils.removeObjectProperty(target, ['a'])
    expect(utils.removeObjectProperty(target, ['a'])).toEqual(removeTarget)
  })
  it('removeObjectProperty -> 移除对象中不存在指定的key', () => {
    const target = Object.create({ a: 1, b: 2 })
    const removeTarget = utils.removeObjectProperty(target, ['c'])
    expect(removeTarget).toBeUndefined()
  })

  it('removeObjectProperty -> 传入对象为空', () => {
    const target = Object.create({})
    expect(utils.removeObjectProperty(target, ['a'])).toBeFalsy()
  })

  it('sleep -> 函数睡了一秒', () => {
    const date = new Date().getTime()
    const timer = 1000
    utils.sleeper(timer)
    vi.runAllTimers()
    const countTime = Date.now() - date
    expect(countTime).toEqual(timer)
  })

  it('sleep -> 睡眠时间不符合一秒', () => {
    const date = new Date().getTime()
    const timer = 1000
    utils.sleeper(200)
    vi.runAllTimers()
    const countTime = Date.now() - date
    expect(countTime).not.toEqual(timer)
  })
})
