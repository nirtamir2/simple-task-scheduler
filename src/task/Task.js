class Task {
  constructor(fn, timing) {
    this.fn = fn
    this.timing = timing
  }

  setId(id) {
    this.id = id
  }

  getId() {
    return this.id
  }

  setTaskRunner(taskRunner) {
    this.taskRunner = taskRunner
  }

  run() {
    this.taskRunner.run(this)
  }

  stop() {
    this.taskRunner.stop(this)
  }

  reschedule(timing) {
    this.stop()
    this.timing = timing
    this.run()
  }
}

module.exports = Task
