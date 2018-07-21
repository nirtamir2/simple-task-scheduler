describe.skip('schedular', () => {
  const Schedular = require('./../src/schedular')
  const fn = jest.fn()
  describe('doAfter', () => {
    test('execute the function on a given time', () => {
      Schedular.doAfter(fn, { days: 2 })

      expect()
    })
  })
})
