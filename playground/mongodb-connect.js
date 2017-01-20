//const MongoClient = require('mongodb').MongoClient; REGULAR JS
const {MongoClient, ObjectID} = require('mongodb');         //ES6 Destructuring

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
      if(err){
        return console.log('Unable to insert todo: ', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
      console.log(result.ops[0]._id.getTimestamp());
  });
  db.close();
});
