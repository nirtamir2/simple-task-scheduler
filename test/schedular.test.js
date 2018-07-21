describe('schedular', () => {
  const Schedular = require('./../src/scheduler')
  let fn
  beforeEach(() => {
    fn = jest.fn()
  })
  describe('doAfter', () => {
    test('execute the function after a given time', () => {
      jest.useFakeTimers()

      Schedular.doAfter(fn, { seconds: 1 })

      const time = 1000
      jest.advanceTimersByTime(time - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    test('execute miltiple functions by their time', () => {
      jest.useFakeTimers()
      const later = jest.fn()
      const secondToMilliseconds = 1000
      Schedular.doAfter(later, { seconds: 2 })
      Schedular.doAfter(fn, { seconds: 1 })

      jest.advanceTimersByTime(secondToMilliseconds - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(secondToMilliseconds - 1)
      expect(later).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(later).toHaveBeenCalledTimes(1)
    })
  })

  describe('doAt', () => {
    test.skip('execute the function on a given time', () => {
      jest.useFakeTimers()

      const today = new Date(2018, 7, 21, 11, 0, 0, 0)
      const tomorrow = new Date(2018, 7, 22, 11, 0, 0, 0)
      const DAY_TO_MILLISECONDS = 24 * 60 * 60 * 1000

      Date.now = jest.fn(() => today)

      Schedular.doAt(fn, tomorrow)
      jest.advanceTimersByTime(DAY_TO_MILLISECONDS - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
