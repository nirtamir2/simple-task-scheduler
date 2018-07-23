const { setTimeout, clearTimeout } = require('long-timeout')

class CalenderTaskRunner {
  run(task) {
    this.timeout = setTimeout(task.fn, task.timing - Date.now())
  }
  stop(task) {
    clearTimeout(this.timeout)
  }
}

module.exports = CalenderTaskRunner
