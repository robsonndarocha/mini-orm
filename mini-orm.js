
const User = require('./user');

// User.createTable();

// User.create({
//   first_name: 'Robson',
//   last_name: 'da Rocha',
//   email: 'robsonndarocha@gmail.com',
// });

// User.find({ id: 1 });

User.findAll({ first_name: 'Robson' });
