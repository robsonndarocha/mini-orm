
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mini-orm.db');

class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static createTable() {
    const query = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL)';

    console.log('Creating table "users"...');

    return new Promise((resolve, reject) => {
      db.run(query, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Users table successfully created!');
        resolve('Success!');
      });
      db.close();
    });
  }

  create() {
    const self = this;
    const query = 'INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)';

    console.log(`Creating user ${self.firstName}...`);

    return new Promise((resolve, reject) => {
      db.run(query, [self.firstName, self.lastName, self.email], (err) => {
        if (err) {
          reject(err);
        }
        console.log(`User ${self.firstName} created in the database.`);
        self.id = self.lastID;
        resolve(self);
      });
      db.close();
    });
  }

  static find(id) {
    const query = 'SELECT * FROM users WHERE id = ? LIMIT 1';

    console.log('Finding user...');

    return new Promise(((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        console.log('One match found:');
        console.log(`${JSON.stringify(row, null, '\t')}`);
        const user = new User(row.firstName, row.lastName, row.email);
        user.id = row.id;
        resolve(user);
      });
      db.close();
    }));
  }

  static findAll(firstName) {
    const query = 'SELECT * FROM users WHERE firstName = ?';

    console.log('Finding all users...');

    return new Promise((resolve, reject) => {
      db.all(query, [firstName], (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(`${rows.length} users found!`);
        const users = rows.map((row) => {
          const user = new User(row.firstName, row.lastName, row.email);
          user.id = row.id;
          return user;
        });
        resolve(users);
      });
    });
  }
}

module.exports = User;
