const {mongooose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

// Todo.remove({}).then((result) => {
//     console.log('Removed all the documents', result);
// });

// Todo.findOneAndRemove({_id: '588388ec952d68a6d9593c1e'}).then((todo) => {
//   console.log('To do removed', todo);
// });

// Todo.findByIdAndRemove('588388ec952d68a6d9593c1e').then((todo) => {
//   console.log('To do removed', todo);
// });
