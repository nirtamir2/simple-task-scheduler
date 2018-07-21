const Scheduler = require('my-unwritten-schedule')

const sendEmailtask = Scheduler.doAfter(() => {}, { days: 2 })
const sendNotificationtask = Scheduler.doAt(() => {}, new Date())
const resetCachetask = Scheduler.doRecurrent(() => {}, { days: 14 })
Scheduler.cancel(task)
Scheduler.changeSchedule(task, { days: 21 })
Scheduler.stopAll()
