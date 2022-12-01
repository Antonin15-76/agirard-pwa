import mongoose from "mongoose"

const { Schema } = mongoose

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  listId: {
    type: Schema.Types.ObjectId
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

// Exemple.create({ firstname: "Joe", lastname: "Biden", birthdate: new Date() })

export default Task

