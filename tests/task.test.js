const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {taskOne, userOne, userTwo, userTwoId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({description: 'From my test'})
        .expect(201)
    const task = await Task.findById(response.body._id).lean()
    expect(task).not.toBeNull()

    expect(task.completed).toEqual(false)
})

test('Should request all tasks for user one and assert correct status code', 
async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Attempt to have the second user to delete the first task, assert the failed status code',
async () => {
    await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findOne({
        _id: taskOne._id
    }).lean()
    expect(task).not.toBeNull()
})