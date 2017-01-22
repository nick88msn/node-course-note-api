const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test to do',
  completed: false
},{
  _id: new ObjectID(),
  text: 'Second test to do',
  completed: true,
  completedAt: 333
}];

var badID = new ObjectID();

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done());
  });
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () =>{
  it('should get all todos', (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
});

describe('GET /todos/:id', () => {

  it('should return todo doc ', (done) => {
    request(app).get(`/todos/${new ObjectID(todos[0]._id)}`).expect(200).expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app).get(`/todos/${badID.toHexString()}`).expect(404).end(done);
  });

  it('should return 404 for non object ids', (done) => {
    request(app).get('/todos/123').expect(404).end(done);
  });

});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexID);
    }).end((err, res) => {
      if(err){
        return done(err);
      }
      Todo.findById(hexID).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    var badID = new ObjectID();
    request(app).delete(`/todos/${badID}`).expect(404).end(done);
  });

  it('should return 404 if object id is not valid', (done) => {
    request(app).delete(`/todos/123123123`).expect(404).end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update a document', (done) =>{
    var hexID = todos[0]._id.toHexString();
    var text = 'Some new Text for Test';
    request(app).patch(`/todos/${hexID}`).send({text, completed: true}).expect(200).expect((res)=>{
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completedAt).toBeA('number');
      }).end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(hexID).then((todo) =>{
        expect(todo.completed).toBe(true);
        expect(todo.text).toBe(text);
        expect(todo.completedAt).toExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexID = todos[1]._id.toHexString();
    var text = 'Some new Text for Test';

    request(app).patch(`/todos/${hexID}`).send({text, completed: false}).expect(200).expect((res)=>{
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.text).toBe(text);
      }).end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(hexID).then((todo) =>{
        expect(todo.completed).toBe(false);
        expect(todo.text).toBe(text);
        expect(todo.completedAt).toNotExist();
        done();
      }).catch((e) => done(e));
    });

  });
  //grab id osecond todo item
  //update text , set completed to false
  //200
  //body text is changed e completed false e completedAt is null .tonotexist()

});
