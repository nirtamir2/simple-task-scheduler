const { setTimeout, clearTimeout } = require('long-timeout')
const cronParser = require('cron-parser')

class CronTaskRunner {
  run(task) {
    const self = this
    const recurrentCron = (fn, cronInterval) => {
      function reschedule() {
        const recurrentFn = () => {
          if (cronInterval.hasNext()) {
            self.interval = setTimeout(
              recurrentFn,
              cronInterval.next().toDate() - Date.now()
            )
          }
          fn()
        }
        self.interval = setTimeout(
          recurrentFn,
          cronInterval.next().toDate() - Date.now()
        )
      }

      self.interval = reschedule()
    }
    recurrentCron(task.fn, cronParser.parseExpression(task.timing))
  }

  stop(task) {
    clearTimeout(this.timeout)
  }
}

module.exports = CronTaskRunner
