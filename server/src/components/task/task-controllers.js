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
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    const tasks = await Task.find({ _id: ctx.params.id })
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
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
  try {
    const tasks = await Task.deleteOne(
      { _id: ctx.params.id })
    ctx.ok(tasks)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}