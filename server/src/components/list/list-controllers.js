import List from './list-model.js'
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
    const listValidationSchema = Joi.object({
      name: Joi.string().required()
    })

    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    console.log('No error found continuing the process', value);
    const newList = await List.create(value)
    ctx.ok(newList)
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  // console.log(ctx.params)
  // console.log(ctx.query)
  ctx.ok({})
}