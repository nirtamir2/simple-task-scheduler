const { toMilliseconds } = require('./durationConverter')
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

function stopAll() {
  Timer.stopAll()
}

function cancel(task) {
  Timer.cancel(task)
}

function reschedule(task, period) {
  Timer.reschedule(task, toMilliseconds(period))
}

module.exports = { doAfter, doAt, doRecurrent, stopAll, cancel, reschedule }
