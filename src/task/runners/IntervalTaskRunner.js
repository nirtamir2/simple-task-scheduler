const { setInterval, clearInterval } = require('long-timeout')
const { toMilliseconds } = require('./../../durationConverter')

class IntervalTaskRunner {
  run(task) {
    this.timeout = setInterval(task.fn, toMilliseconds(task.timing.period))
  }
  stop(task) {
    clearInterval(this.timeout)
  }
}

module.exports = IntervalTaskRunner
