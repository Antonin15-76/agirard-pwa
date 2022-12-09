import Router from '@koa/router'
import * as taskControllers from './task-controllers.js'

const tasks = new Router()

tasks.get('/', taskControllers.index)
tasks.get('/:id', taskControllers.id)
tasks.get('/list/:id', taskControllers.listId)
tasks.post('/', taskControllers.create)
tasks.put('/:id', taskControllers.update)
tasks.put('/move/:id', taskControllers.updateListId)
tasks.delete('/:id', taskControllers.deleteTask)

export default tasks