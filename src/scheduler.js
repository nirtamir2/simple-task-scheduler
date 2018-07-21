const { toMilliseconds } = require('./durationConverter')
const Timer = require('./timer')

function doAfter(fn, time) {
  Timer.time(fn, toMilliseconds(time))
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
  Timer.recurrent(fn, toMilliseconds(period))
}

function stopAll() {
  Timer.stopAll()
}

module.exports = { doAfter, doAt, doRecurrent, stopAll }
