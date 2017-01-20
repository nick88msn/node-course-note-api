//const MongoClient = require('mongodb').MongoClient; REGULAR JS
const {MongoClient, ObjectID} = require('mongodb');         //ES6 Destructuring

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Walk the dog'}).then((result) => console.log(result));

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //     // console.log(result);
  // });

  // //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // });

  //Eliminiamo i duplicati in Users
  db.collection('Users').deleteMany({name: 'Nicola'}).then((result) => {
      // console.log(result);
    });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5881cd7b4d433f22b47b7ce6')}).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });


  db.close();
});
