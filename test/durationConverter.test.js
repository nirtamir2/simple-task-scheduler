describe('date convert to milliseconds', () => {
  const durationConverter = require('../src/durationConverter')

  test('only seconds', () => {
    const dateObject = { seconds: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(1000)
  })
  test('only minutes', () => {
    const dateObject = { minutes: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(1000 * 60)
  })
  test('only hours', () => {
    const dateObject = { hours: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(60 * 60 * 1000)
  })
  test('only days', () => {
    const dateObject = { days: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(24 * 60 * 60 * 1000)
  })
  test('only weeks', () => {
    const dateObject = { weeks: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(
      7 * 24 * 60 * 60 * 1000
    )
  })
  test('only months', () => {
    const dateObject = { months: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(
      30 * 24 * 60 * 60 * 1000
    )
  })
  test('only years', () => {
    const dateObject = { years: 1 }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(
      365 * 24 * 60 * 60 * 1000
    )
  })

  test('integration', () => {
    const dateObject = {
      years: 1,
      months: 2,
      weeks: 3,
      days: 4,
      hours: 5,
      minutes: 6,
      seconds: 7
    }

    expect(durationConverter.toMilliseconds(dateObject)).toBe(
      365 * 24 * 60 * 60 * 1000 +
        2 * 30 * 24 * 60 * 60 * 1000 +
        3 * 7 * 24 * 60 * 60 * 1000 +
        4 * 24 * 60 * 60 * 1000 +
        5 * 60 * 60 * 1000 +
        6 * 60 * 1000 +
        7 * 1000
    )
  })
})
