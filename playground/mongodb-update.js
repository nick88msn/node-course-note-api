//const MongoClient = require('mongodb').MongoClient; REGULAR JS
const {MongoClient, ObjectID} = require('mongodb');         //ES6 Destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');

  db.collection('Users')
  .findOneAndUpdate({
    name: 'Franco'
  }, {
      $set: {
        name: 'Patrizio'
      }
    }, {
      returnOriginal: false
    })
    .then((result) => {
    console.log(result);
  });

  // db.close();
});
