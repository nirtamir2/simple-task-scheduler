const Timer = require('./../src/timer')

describe('timer', () => {
  describe('time', () => {
    let fn
    beforeEach(() => {
      fn = jest.fn()
    })

    test('should call the function in the time', () => {
      jest.useFakeTimers()

      Timer.time(fn, 300)
      jest.advanceTimersByTime(299)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    test('should call the function in the time', () => {
      jest.useFakeTimers()

      const monthToMilliseconds = 1000 * 60 * 60 * 24 * 30
      Timer.time(fn, monthToMilliseconds)
      jest.advanceTimersByTime(monthToMilliseconds - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
