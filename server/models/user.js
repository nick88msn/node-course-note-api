var mongoose = require('mongoose');
//Defining the user Model
var User = mongoose.model('User', {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    password: {
      type: String,
      required: true,
      default: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    },
    createdAt: {
      type: Number,
      required: true,
      default: Date.now()
    }
});
module.exports = {User};
// //creating a new istance
// var newUsers = new User({
//   email: 'expample@email.com'
// })
// //saving to MongoDB
// newUsers.save().then((doc) =>{
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log(e);
// });
