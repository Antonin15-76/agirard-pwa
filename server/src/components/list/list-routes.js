import Router from '@koa/router'
import * as listControllers from './list-controllers.js'

const lists = new Router()

lists.get('/', listControllers.index)
lists.get('/:id', listControllers.id)
lists.post('/', listControllers.create)
lists.put('/:id', listControllers.update)
lists.delete('/:id', listControllers.deleteList)

export default lists