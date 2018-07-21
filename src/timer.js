const { setTimeout, setInterval, clearTimeout } = require('long-timeout')
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

function stopAll() {
  for (const { interval } of Object.values(recurrentTimeoutIds)) {
    clearTimeout(interval)
  }
}

function stop(taskId) {
  const { interval } = recurrentTimeoutIds[taskId]
  clearTimeout(interval)
}

function reschedule(taskId, milliseconds) {
  const taskDetails = recurrentTimeoutIds[taskId]
  clearTimeout(taskDetails.interval)
  taskDetails.interval = setInterval(taskDetails.fn, milliseconds)
}

module.exports = { time, recurrent, stopAll, stop, reschedule }
