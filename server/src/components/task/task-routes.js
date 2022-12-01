import Router from '@koa/router'
import * as taskControllers from './task-controllers.js'

const tasks = new Router()

tasks.get('/', taskControllers.index)
tasks.get('/:id', taskControllers.id)
tasks.post('/', taskControllers.create)

export default tasks