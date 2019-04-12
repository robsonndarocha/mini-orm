const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('mini-orm.db');

class User {

  constructor(first_name, last_name, email) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }

  static createTable() {
    const query =
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL
    )`;

    return new Promise(function(resolve) {
      db.run(query, function() {
        console.log('Users table successfully created!');
        resolve('Success!');
      });
    });
  }

  create() {
    const self = this;
    const query = `INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)`;
    console.log(`Creating user ${self.first_name}...`);

    return new Promise(function(resolve) {
      db.run(query, [self.first_name, self.last_name, self.email], function() {
        console.log(`User ${self.first_name} created in the database.`);
        self.id = self.lastID;
        resolve(self);
      });
    });
  }

  static find(id) {
    const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';

    return new Promise(function(resolve) {
      db.get(query, [id], function(err, resultRow) {
        console.log(`One match found: ${JSON.stringify(resultRow)}.`);
        const user = new User(resultRow.first_name, resultRow.last_name, resultRow.email);
        user.id = resultRow.id;
        resolve(user);
      });
    });
  }

  static findAll(first_name) {
    const query = `SELECT * FROM users WHERE name = ?`;

    return new Promise(function(resolve) {
      db.all(query, [first_name], function(err, results) {
        console.log(`${results.length} users found!`);
        const users = results.map(function(userRow) {
          const user = new User(userRow.first_name, userRow.last_name, userRow.email);
          user.id = userRow.id;
          return user;
        });
      });
    });
  }

}

module.exports = User;
