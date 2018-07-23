const { setTimeout, setInterval, clearInterval } = require('long-timeout')
const recurrentTimeoutIds = {}
let i = 0

function time(fn, milliseconds) {
  setTimeout(fn, milliseconds)
}

function recurrent(fn, milliseconds) {
  const intervalId = setInterval(fn, milliseconds)
  const taskId = `Task ${++i}`
  recurrentTimeoutIds[taskId] = { interval: intervalId, fn }
  return taskId
}

function recurrentCron(fn, cronInterval) {
  const taskId = `Task ${++i}`

  function reschedule() {
    const recurrentFn = () => {
      if (cronInterval.hasNext()) {
        const timeout = cronInterval.next().toDate() - Date.now()
        recurrentTimeoutIds[taskId].interval = setTimeout(recurrentFn, timeout)
      }
      fn()
    }
    const timeout = cronInterval.next().toDate() - Date.now()
    const interval = setTimeout(recurrentFn, timeout)
    return interval
  }

  const interval = reschedule()
  recurrentTimeoutIds[taskId] = { interval, fn }
  return taskId
}

function stopAll() {
  for (const { interval } of Object.values(recurrentTimeoutIds)) {
    clearInterval(interval)
  }
}

function stop(taskId) {
  const { interval } = recurrentTimeoutIds[taskId]
  clearInterval(interval)
}

function reschedule(taskId, milliseconds) {
  const taskDetails = recurrentTimeoutIds[taskId]
  clearInterval(taskDetails.interval)
  taskDetails.interval = setInterval(taskDetails.fn, milliseconds)
}

module.exports = {
  time,
  recurrent,
  stopAll,
  stop,
  reschedule,
  recurrentCron
}
