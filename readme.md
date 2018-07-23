# Schedular

A scheduler is a component that allows you to schedule tasks that will be
executed in the future.

**NOTE:** `reschedule` should use the same timing format as the task when initialized - (i.e : recurrent tasks will be reschedule to different recurrent interval... So its use only to change the period of the time).

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

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
Scheduler.doRecurrentCron(fn, '3 * * * * *')

const recurrentTask = Scheduler.doRecurrent(fn, { days: 14 })
Scheduler.reschedule(recurrentTask, { days: 21 })
Scheduler.stop(recurrentTask)

Scheduler.stopAll()
```
