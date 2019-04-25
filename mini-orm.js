
const User = require('./user');

// User.createTable();

// User.create({
//   first_name: 'Robson',
//   last_name: 'da Rocha',
//   email: 'robsonndarocha@gmail.com',
// });

const user = User.find({ id: 1 });
user.then(data => console.log(data));

// const userPromise = User.findAll({ first_name: 'Robson' });
// userPromise.then((data) => {
//   data.forEach((element) => {
//     console.log(element);
//   });
// });

// const userPromise = User.find({ id: 1 });
// userPromise.then((row) => {
//   const user = new User(row.id, row.first_name, row.last_name, row.email);
//   user.setAttribute({ first_name: 'Robson' });
// });

// const userPromise = User.find({ id: 1 });
// userPromise.then((row) => {
//   const user = new User(row.id, row.first_name, row.last_name, row.email);
//   user.getAttribute('first_name');
// });
