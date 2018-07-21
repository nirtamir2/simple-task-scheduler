# Schedular

A scheduler is a component that allows you to schedule tasks that will be
executed in the future.

```javascript
const Scheduler = require('simple-task-scheduler')

const duration = {
  years: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
}

const task = Scheduler.doAfter(yourFunction, { days: 2 })
const taskAtSpecificDate = Scheduler.doAt(yourFunction, new Date())
const recurrentTask = Scheduler.doRecurrent(yourFunction, { days: 14 })

Scheduler.cancel(recurrentTask)
Scheduler.reschedule(recurrentTask, { days: 21 })

Scheduler.stopAll()
```
