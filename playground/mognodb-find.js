//const MongoClient = require('mongodb').MongoClient; REGULAR JS
const {MongoClient, ObjectID} = require('mongodb');         //ES6 Destructuring

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Connected to MongoDB Server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5880db90bf5cf637046de6a4')
  // }).toArray().then((docs) =>{
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });


//Utilizziamo il metodo count e gestiamo la promessa per visualizzare il numero di documenti
  db.collection('Todos').find().count().then((count) =>{
      console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

// Popoliamo il db Users
// db.collection('Users').insertMany(
//   [{name: 'Nicola'},{name: 'Franco'},{name: 'Luca'}, {name: 'Luca'}], (err, result) => {
//     if(err){
//       return console.log('Unable to insert Users: ', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
// });

//Utilizziamo count per verificare con una query quanti utenti di nome Nicola ci sono

db.collection('Users').find({name: 'Nicola'}).count().then((count) => console.log(`Nicola in User Collection: ${count}`), (err) => console.log('Error:', error));

  db.close();
});
