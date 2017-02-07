const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const jwt = require('jsonwebtoken');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
  _id: userOneID,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneID.toHexString(), access: 'auth'}, 'abc123').toString()
  }]

}, {
  _id: userTwoID,
  email: 'example@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoID.toHexString(), access: 'auth'}, 'abc123').toString()
  }]
}]

const todos = [{
  _id: new ObjectID(),
  text: 'First test to do',
  completed: false,
  _creator: userOneID
},{
  _id: new ObjectID(),
  text: 'Second test to do',
  completed: true,
  completedAt: 333,
  _creator: userTwoID
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done());
  });
}

const populateUsers = (done) => {
  User.remove({}).then(() =>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  populateTodos,
  todos,
  users,
  populateUsers
};
