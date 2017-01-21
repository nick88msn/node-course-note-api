const {mongooose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

var id = '58834abc4c24ba118c4d0a57';

if (ObjectID.isValid(id)) {
  //.find()
  Todo.find({
          _id: id
      }).then((todos) => {
          console.log('Fetches all Todos\n', todos + '\n');
      })

  //.findOne()
  Todo.findOne({
          _id: id
      }).then((todo) => {
        if(!todo){
          return console.log('Todo not found');
        }
        console.log('Send just the first Todo\n', todo);
      })
  //findByID
  Todo.findById(id).then((todo) => {
          if(!todo){
            return console.log('Todo not found');
          }
          console.log('Searching by ID\n', todo);
      })
      // .catch((e) => {
      //   console.log('Unexpected error, check you id');
      // });
} else {
  console.log('Object ID is not valid');
}

//Challenge: fare lo stesso per la collezione user
var userID = '58820abeaca0b20438dd610e';

if (ObjectID.isValid(userID)){

  User.findById(userID).then((user) => {
    if(!user){
      return console.log('User not found');
    }
    console.log('\nFound a user with that ID:', JSON.stringify(user, undefined, 2));
  });

} else {
  console.log('User ID: ' + userID + ' Is not valid');
}
