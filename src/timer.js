const { setTimeout, setInterval } = require('long-timeout')

function time(fn, milliseconds) {
  setTimeout(fn, milliseconds)
}

function recurrent(fn, milliseconds) {
  setInterval(fn, milliseconds)
}

module.exports = { time, recurrent }
