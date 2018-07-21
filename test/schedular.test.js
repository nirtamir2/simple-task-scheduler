describe('schedular', () => {
  const Schedular = require('./../src/scheduler')
  let fn
  beforeEach(() => {
    fn = jest.fn()
  })
  describe('doAfter', () => {
    test('execute the function on a given time', () => {
      jest.useFakeTimers()

      Schedular.doAfter(fn, { seconds: 1 })

      const time = 1000
      jest.advanceTimersByTime(time - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)

      expect()
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
})
