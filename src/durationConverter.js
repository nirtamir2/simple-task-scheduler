function toMilliseconds(dateObject) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = dateObject

  const SECONDS_TO_MILLISECONDS = 1000
  const MINUTES_TO_MILLISECONDS = 60 * SECONDS_TO_MILLISECONDS
  const HOURS_TO_MILLISECONDS = 60 * MINUTES_TO_MILLISECONDS
  const DAYS_TO_MILLISECONDS = 24 * HOURS_TO_MILLISECONDS
  const WEEKS_TO_DAYS = 7 * DAYS_TO_MILLISECONDS
  const MONTHS_TO_MILLISECONDS = 30 * DAYS_TO_MILLISECONDS
  const YEARS_TO_MILLISECONDS = 365 * DAYS_TO_MILLISECONDS

  return (
    SECONDS_TO_MILLISECONDS * seconds +
    MINUTES_TO_MILLISECONDS * minutes +
    HOURS_TO_MILLISECONDS * hours +
    DAYS_TO_MILLISECONDS * days +
    WEEKS_TO_DAYS * weeks +
    MONTHS_TO_MILLISECONDS * months +
    YEARS_TO_MILLISECONDS * years
  )
}

module.exports = { toMilliseconds }
