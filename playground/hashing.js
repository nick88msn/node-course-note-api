const bcrypt = require('bcryptjs');

var password = '123abc!';
// //sincrono
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(password, salt);
//
// console.log('Password:'+ password + '\n' + 'Salt:'+ salt + '\n' + 'Hash:' + hash + '\n-----------');
//
// //asincrono
// var salt = bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log('\n----Asincronous hash-------\n',hash);
//   });
// });

var hashedPassword = '$2a$10$3sbUTaBGiCQXja37ctbZ..AbVBzTLlTtf.0rVMymm5q8u22fd4biy';

bcrypt.compare(password, hashedPassword, (err, res) =>{
  console.log(res);
})

// // const {SHA256} = require('crypto-js');
// //
// // // var message = 'I am user number 3';
// // // var hash = SHA256(message).toString();
// // //
// // // console.log("Original Message:\t" + message + "\nSecure HAsh 256:", hash);
// //
// // var data = {
// //   id: 4
// // };
// //
// // var token = {
// //   data,
// //   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// // }
// //
// // var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// //
// // if(resultHash === token.hash){
// //   console.log('data was not changed');
// // } else {
// //   console.log('data was changed. Do not trust');
// // }
//
//
// const jwt = require('jsonwebtoken');
// var data = {
//   id: 10
// }
// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded= jwt.verify(token, '123abc');
// console.log(decoded);
