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
    console.log(ctx.request.body)
    const taskValidationSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      listId: Joi.any().required().label('idList')
    })

    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    console.log('No error found continuing the process', value);
    const newTask = await Task.create(value)
    ctx.ok(newTask)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  // console.log(ctx.params)
  // console.log(ctx.query)
  ctx.ok({})
}