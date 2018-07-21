const { setTimeout, setInterval, clearTimeout } = require('long-timeout')
const recurrentTimeoutIds = {}
let i = 0

function time(fn, milliseconds) {
  setTimeout(fn, milliseconds)
}

function recurrent(fn, milliseconds) {
  const intervalId = setInterval(fn, milliseconds)
  const taskId = `Task ${++i}`
  recurrentTimeoutIds[taskId] = intervalId
  return taskId
}

function stopAll() {
  for (const id of Object.values(recurrentTimeoutIds)) {
    clearTimeout(id)
  }
}

function cancel(taskId) {
  const timeoutId = recurrentTimeoutIds[taskId]
  clearTimeout(timeoutId)
}

module.exports = { time, recurrent, stopAll, cancel }
