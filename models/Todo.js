const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  id: {
    type: String
  },
  description: {
    type: String
  },
  deadline: {
    type: String
  },
  labelColor: {
    type: String
  },
  completed: {
    type: Boolean
  }
}, {
    collection: 'todos'
  })

module.exports = mongoose.model('Todo', todoSchema)