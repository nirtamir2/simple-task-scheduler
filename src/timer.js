const { setTimeout, setInterval, clearTimeout } = require('long-timeout')
const recurrentTimeoutIds = []

function time(fn, milliseconds) {
  setTimeout(fn, milliseconds)
}

function recurrent(fn, milliseconds) {
  const intervalId = setInterval(fn, milliseconds)
  recurrentTimeoutIds.push(intervalId)
}

function stopAll() {
  for (const id of recurrentTimeoutIds) {
    clearTimeout(id)
  }
}

module.exports = { time, recurrent, stopAll }
