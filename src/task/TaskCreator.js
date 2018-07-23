const Task = require('./Task')

const CalenderTaskRunner = require('./runners/CalenderTaskRunner')
const CronTaskRunner = require('./runners/CronTaskRunner')
const IntervalTaskRunner = require('./runners/IntervalTaskRunner')
const PeriodTaskRunner = require('./runners/PeriodTaskRunner')

let i = 0
const tasks = []

function getNextId() {
  return `Task ${++i}`
}

function stopAll() {
  for (const task of tasks) {
    task.stop()
  }
}

function stop(taskId) {
  const task = tasks.find(t => t.getId() === taskId)
  task.stop()
}

function reschedule(taskId, timing) {
  const task = tasks.find(t => t.getId() === taskId)
  task.reschedule({ period: timing })
}

function doAfter(fn, period) {
  const task = new Task(fn, { period: period })
  task.setTaskRunner(new PeriodTaskRunner())
  task.setId(getNextId())
  tasks.push(task)
  task.run()
  return task.getId()
}

function doAt(fn, date) {
  if (!(date instanceof Date)) {
    throw new Error('date should be Date object')
  }
  if (date - Date.now() < 0) {
    throw new Error('date should be in the future')
  }

  const task = new Task(fn, { date: date })
  task.setTaskRunner(new CalenderTaskRunner())
  task.setId(getNextId())
  tasks.push(task)
  task.run()
  return task.getId()
}

function doRecurrent(fn, period) {
  const task = new Task(fn, { period: period })
  task.setTaskRunner(new IntervalTaskRunner())
  task.setId(getNextId())
  tasks.push(task)
  task.run()
  return task.getId()
}

function doRecurrentCron(fn, cron) {
  const task = new Task(fn, { cron: cron })
  task.setTaskRunner(new CronTaskRunner())
  task.setId(getNextId())
  tasks.push(task)
  task.run()
  return task.getId()
}

module.exports = {
  stopAll,
  stop,
  reschedule,
  doAfter,
  doAt,
  doRecurrent,
  doRecurrentCron
}
