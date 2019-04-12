
const User = require('./user.js');

// async function createTable('users') {
//   await User.createTable();
// }

// async function createUser() {
//   const robson = new User('Robson', 'da Rocha', 'robsonndarocha@gmail.com');
//   await robson.create();
// }

// async function findUser() {
//   await User.find(1);
// }

async function findAll(firstName) {
  await User.findAll(firstName);
}

findAll('Robson');
