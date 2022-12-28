import List from './list-model.js'
import Task from '../task/task-model.js'
import Joi from 'joi'

export async function index (ctx) {
  try {
    const lists = await List.find({})
    console.log(lists)
    ctx.ok(lists)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    console.log(ctx.request.body)
    const newData = {
      name: ctx.request.body.data.data
    }
    const listValidationSchema = Joi.object({
      name: Joi.string().required()
    })

    const { error, value } = listValidationSchema.validate(newData)
    if(error) throw new Error(error)
    console.log('No error found continuing the process', value)
    const newList = await List.create(value)
    console.log('28', newList)
    ctx.ok(newList)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    const list = await List.find({ _id: ctx.params.id })
    console.log('34', list)
    ctx.ok(list)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  let name = ''
  if (ctx.request.body.newObject) {
    name = ctx.request.body.newObject.name
  } else {
    name = ctx.request.body.data.name
  }
  try {
    const list = await List.updateOne(
      { _id: ctx.params.id },
      { $set: { "name": name }})
    ctx.ok(list)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
  ctx.ok({})
}

export async function deleteList (ctx) {
  console.log('68', ctx.params.id)
  try {
    const list = await List.deleteOne(
      { _id: ctx.params.id })
    const tasks = await Task.find(
      { "listId" : ctx.params.id })
      console.log("67", tasks)
      if (tasks.length > 0) {
      const deleteTask = Promise.all(tasks.map(async x => {
         await Task.deleteOne({ _id: x._id })
        }))
      }
    ctx.ok(list)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
  ctx.ok({})
}
