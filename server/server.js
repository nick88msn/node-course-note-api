var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    console.log('Request Body:', req.body);
    var todo = new Todo({
      text: req.body.text
    });
    todo.save().then((doc) =>{
      res.send(doc);
    }, (e) =>{
      console.log(e);
      res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
  res.send({
    todos
  });
}, (err) => {
  res.status(400).send(err);
});

});

app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;
    if(ObjectID.isValid(id)){
      Todo.findById(id).then((todo) => {
        if(!todo){
          res.status(404).send();
        } else {
          res.send({
            todo
          });
        }
      }).catch((e) => res.status(400).send());
    } else {
      return res.status(400).send('Oject ID is not Valid');
    }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


module.exports = {
  app
};
