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

    test('execute multiple functions by their time', () => {
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
    const now = new Date(2018, 7, 21, 11, 0, 0, 0)

    let dateNowSpy
    beforeEach(() => {
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now)
    })

    afterEach(() => {
      dateNowSpy.mockReset()
      dateNowSpy.mockRestore()
    })

    test('execute the function on a given time', () => {
      jest.useFakeTimers()
      const tomorrow = new Date(2018, 7, 22, 11, 0, 0, 0)
      const DAY_TO_MILLISECONDS = 24 * 60 * 60 * 1000

      Schedular.doAt(fn, tomorrow)
      jest.advanceTimersByTime(DAY_TO_MILLISECONDS - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    test('throws error when invalid date', () => {
      expect(() => {
        Schedular.doAt(fn, {})
      }).toThrow()
    })
    test('throws error when past date', () => {
      const yesterday = new Date(2018, 7, 20, 11, 0, 0, 0)
      expect(() => {
        Schedular.doAt(fn, yesterday)
      }).toThrow()
    })
  })

  describe('doRecurrent', () => {
    test('execute the function 2 on double period', () => {
      jest.useFakeTimers()

      Schedular.doRecurrent(fn, { seconds: 1 })
      const period = 1000

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

      Schedular.doRecurrent(fn, { seconds: 1 })
      const period = 1000

      jest.advanceTimersByTime(period - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)

      Schedular.stopAll()

      jest.advanceTimersByTime(period)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
  describe.skip('changeSchedule', () => {
    test('change the schedule', () => {
      jest.useFakeTimers()

      const task = Schedular.doRecurrent(fn, { seconds: 1 })
      Schedular.changeSchedule(task, { seconds: 2 })
      const period = 2000

      jest.advanceTimersByTime(period - 1)
      expect(fn).toHaveBeenCalledTimes(0)
      jest.advanceTimersByTime(1)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('cancel', () => {
    test('canceled task not executed when its period passed', () => {
      jest.useFakeTimers()

      const task = Schedular.doRecurrent(fn, { seconds: 1 })
      Schedular.cancel(task)
      const period = 1000

      jest.advanceTimersByTime(period)
      expect(fn).toHaveBeenCalledTimes(0)
    })
  })
})
