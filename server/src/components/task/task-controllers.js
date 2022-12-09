import Task from './task-model.js'
import Joi from 'joi'

export async function index (ctx) {
  try {
    const tasks = await Task.find({})
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    console.log('15',ctx.request.body)
    const taskValidationSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      isValid: Joi.boolean().label("validé"),
      listId: Joi.any().required().label('idList')
    })

    const { error, value } = taskValidationSchema.validate(ctx.request.body.data)
    if(error) throw new Error(error)
    console.log('No error found continuing the process', value);
    const newTask = await Task.create(value)
    ctx.ok(newTask)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function listId (ctx) {
  try {
    const tasks = await Task.find({ listId: ctx.params.id })
    console.log(tasks)
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  console.log('44', ctx.params.id)
  try {
    const tasks = await Task.find({ _id: ctx.params.id })
    console.log('46', tasks)
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  console.log(ctx.request.body)
  const data = ctx.request.body.data

  try {
    const tasks = await Task.updateOne(
      { _id: ctx.params.id },
      { $set: { "name": data.name, "description": data.description, "isValid": data.isValid }})
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function updateListId (ctx) {
  console.log('68', ctx.request.body)
  const listId = ctx.request.body.listId

  try {
    const tasks = await Task.updateOne(
      { _id: ctx.params.id },
      { $set: { "listId": listId }})
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function deleteTask (ctx) {
  console.log('83', ctx.params.id)
  try {
    const tasks = await Task.deleteOne(
      { _id: ctx.params.id })
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}