const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  id: {
    type: String
  },
  label: {
    type: String
  },
  completed: {
    type: Boolean
  }
}, {
    collection: 'todos'
  })

module.exports = mongoose.model('Todo', todoSchema)