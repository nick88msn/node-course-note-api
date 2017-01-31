require('./config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');

const port = process.env.PORT;

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
      return res.status(404).send('Object ID is not Valid');
    }
});

app.delete('/todos/:id', (req, res) =>{
    //get the id
    var id = req.params.id;
    //validate the id -> not valid return 404
    if(!ObjectID.isValid(id)){
      return res.status(404).send()
    }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) =>{
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => res.status(400).send())
      //success
          //if no doc, send 404
          // if doc, send doc back with 200
      //error
          //send 400 e empty body
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo){
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body,['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user.toJSON());
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate,(req,res) =>{
    res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) =>{
  var body = _.pick(req.body,['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=> {
      res.header('x-auth', token).send(user.toJSON());
    });
  }).catch((e) =>{
    res.status(400).send(e);
  });

});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = {
  app
};
