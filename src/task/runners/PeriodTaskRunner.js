const { setTimeout, clearTimeout } = require('long-timeout')
const { toMilliseconds } = require('./../../durationConverter')

class PeriodTaskRunner {
  run(task) {
    this.timeout = setTimeout(task.fn, toMilliseconds(task.timing))
  }
  stop(task) {
    clearTimeout(this.timeout)
  }
}

module.exports = PeriodTaskRunner
