import mongoose from "mongoose"

const { Schema } = mongoose

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const List = mongoose.model('List', listSchema)

// Exemple.create({ firstname: "Joe", lastname: "Biden", birthdate: new Date() })

export default List

