const { toMilliseconds } = require('./durationConverter')
const Timer = require('./timer')

function doAfter(fn, time) {
  Timer.time(fn, toMilliseconds(time))
}

module.exports = { doAfter }
