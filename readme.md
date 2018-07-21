# Schedular

A scheduler is a component that allows you to schedule tasks that will be
executed in the future.

**NOTE:** `cancel`, `stopAll` and `reschedule` currently support only recurrent tasks (i.e : tasks created by `doRecurrent` method).

## Installation

You can install using [npm](https://www.npmjs.com/package/simple-task-scheduler).

```bash
npm install simple-task-scheduler
```

## Usage

```javascript
const Scheduler = require('simple-task-scheduler')

const fn = () => {
  console.log(new Date())
}
const period = {
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

Scheduler.doAfter(fn, { minutes: 2, seconds: 30 })
Scheduler.doAt(fn, new Date())

const recurrentTask = Scheduler.doRecurrent(fn, { days: 14 })
Scheduler.reschedule(recurrentTask, { days: 21 })
Scheduler.cancel(recurrentTask)

Scheduler.stopAll()
```
