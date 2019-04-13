
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mini-orm.db');

const queryBuilder = require('./query-builder.js');

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

  static create(data) {
    const params = queryBuilder.bind(data);

    const query = 'INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)';

    const user = new User(params[1], params[2], params[3]);

    console.log(`Creating user ${user.firstName}...`);

    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        }
        console.log(`User ${user.firstName}} created in the database.`);
        user.id = this.lastID;
        resolve(user);
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

  static findAll(data) {
    const params = queryBuilder.encode(data);

    const query = 'SELECT * FROM users WHERE ?';

    console.log('Finding all users...');

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(`${rows.length} users found!`);
        const users = rows.map((row) => {
          const user = new User(row.firstName, row.lastName, row.email);
          user.id = row.lastID;
          return user;
        });
        resolve(users);
      });
    });
  }

/**
 * TODO - getAttribute() and setAttribute()
 */
}

export default User;
