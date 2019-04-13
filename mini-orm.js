
const User = require('./user.js');

// function createTable('users') {
//   User.createTable();
// }

// function createUser() {
//   User.create({
//     first_name: 'Robson',
//     last_name: 'da Rocha',
//     email: 'robsonndarocha@gmail.com',
//   });
// }

function findUser() {
  User.find(1);
}

// function findAll() {
//   User.findAll({ first_name: 'Robson' });
// }

findUser();
