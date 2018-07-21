const Scheduler = require('my-unwritten-dor')

const sendMailTask = Scheduler.createTask({ name: 'send mail', fn: () => {} })
Scheduler.doAfter(sendMailTask, { days: 2 })

const sendNotificationTask = Scheduler.createTask({
  name: 'send notification',
  fn: () => {}
})
Scheduler.doAt(sendNotificationTask, new Date())

const resetCacheTask = Scheduler.createTask({
  name: 'reset cache',
  fn: () => {}
})
Scheduler.doEvery(resetCacheTask, { days: 2 })

const anonymousTask = Scheduler.createTask({
  fn: () => {}
})
const anonymousTaskId = anonymousTask.name

Scheduler.changeSchedule('reset cache', { at: { days: 2 } })
Scheduler.redo(anonymousTaskId, { days: 1 })
