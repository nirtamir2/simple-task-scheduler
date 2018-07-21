const Timer = require('./../src/timer')

describe('timer', () => {
  let fn
  beforeEach(() => {
    fn = jest.fn()
  })

  describe('time', () => {
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

  describe('recurrent', () => {
    test('call the function 2 times after 2 periods', () => {
      jest.useFakeTimers()

      const period = 300
      Timer.recurrent(fn, period)

      jest.advanceTimersByTime(period - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
      jest.advanceTimersByTime(period - 1)
      expect(fn).toHaveBeenCalledTimes(1)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('stopAll', () => {
    test('stop the function execution', () => {
      jest.useFakeTimers()

      const period = 1000
      Timer.recurrent(fn, period)

      jest.advanceTimersByTime(period - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)

      Timer.stopAll()

      jest.advanceTimersByTime(period)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
