const faker = require('faker')

const taskStatus = ['backlog', 'todo', 'doing', 'done']

const Task = function () {
  return {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    status: taskStatus[Math.floor(Math.random() * taskStatus.length)],
    assigned_to: faker.name.firstName(),
    created_at: faker.date.recent(30),
    updated_at: faker.date.recent(30)
  }
}

module.exports = () => ({ tasks: Array.from(Array(10), el => new Task()) })