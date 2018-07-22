const { toMilliseconds } = require('./durationConverter')
const cronParser = require('cron-parser')

const Timer = require('./timer')

function doAfter(fn, period) {
  Timer.time(fn, toMilliseconds(period))
}

function doAt(fn, date) {
  if (!(date instanceof Date)) {
    throw new Error('date should be Date object')
  }
  const delay = date - Date.now()
  if (delay < 0) {
    throw new Error('date should be in the future')
  }
  Timer.time(fn, delay)
}

function doRecurrent(fn, period) {
  return Timer.recurrent(fn, toMilliseconds(period))
}

function doRecurrentCron(fn, cronFormat) {
  const interval = cronParser.parseExpression(cronFormat)
  return Timer.recurrentCron(fn, interval)
}

function stopAll() {
  Timer.stopAll()
}

function stop(task) {
  Timer.stop(task)
}

function reschedule(task, period) {
  Timer.reschedule(task, toMilliseconds(period))
}

module.exports = {
  doAfter,
  doAt,
  doRecurrentCron,
  stopAll,
  stop,
  reschedule,
  doRecurrent
}
