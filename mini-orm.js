const User = require('./user.js');

async function createTable() {

  await User.createTable();

}

async function createUser() {

  const robson = new User('Robson', 'da Rocha', 'robsonndarocha@gmail.com');
  await robson.create();

}

async function findUser() {

  await User.find(1);

}

async function findAll() {
  await User.findAll('Robson');
}

findAll();
