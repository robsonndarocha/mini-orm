
const User = require('./user.js');

// async function createTable('users') {
//   await User.createTable();
// }

// async function createUser() {
//   await User.create({
//     first_name: 'Robson',
//     last_name: 'da Rocha',
//     email: 'robsonndarocha@gmail.com',
//   });
// }

async function findUser() {
  await User.find(1);
}

// async function findAll() {
//   await User.findAll({ first_name: 'Robson' });
// }

findUser();
