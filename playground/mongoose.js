//loading mongoose
const mongoose = require('mongoose');
//Select the defaul Promise Enginse
mongoose.Promise = global.Promise;
//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/TodaApp');
//Defining the Todo Model
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
  }
});
//Create a new istance of Todo Model
var newTodo = new Todo({
  // text: 'Cook Dinner',
  // completed: true,
  // completedAt: Date.now()
  text: 'Some Thing to Do'
});
//Savomg to MongoDB
newTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo', e);
})

//Defining the user Model
var User = mongoose.model('User', {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    password: {
      type: String,
      required: true,
      default: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
    createdAt: {
      type: Number,
      required: true,
      default: Date.now()
    }
});

//creating a new istance
var newUsers = new User({
  email: 'expample@email.com'
})
//saving to MongoDB
newUsers.save().then((doc) =>{
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log(e);
});
