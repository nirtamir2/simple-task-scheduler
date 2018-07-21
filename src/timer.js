const { setTimeout } = require('long-timeout')

function time(fn, milliseconds) {
  setTimeout(fn, milliseconds)
}

module.exports = { time }
