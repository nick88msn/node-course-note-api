var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: Date.now()
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};

// //Create a new istance of Todo Model
// var newTodo = new Todo({
//   // text: 'Cook Dinner',
//   // completed: true,
//   // completedAt: Date.now()
//   text: 'Some Thing to Do'
// });
// //Savomg to MongoDB
// newTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo', e);
// })
