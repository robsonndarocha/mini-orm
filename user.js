
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mini-orm.db');

const queryBuilder = require('./query-builder');

class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static createTable() {
    const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL)';

    console.log('Creating table "users"...');

    return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
        if (err) {
          reject(err);
        }
        console.log('Users table successfully created!');
        resolve('Success!');
      });
    });
  }

  static create(args) {
    const params = queryBuilder.getParamsFromArgs(args);

    const sql = 'INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)';

    console.log(`Creating user ${params[0]}...`);

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) {
          reject(err);
        }
        console.log(`User ${params[0]} created in the database.`);
        resolve(new User(this.lastID, params[0], params[1], params[2]));
      });
    });
  }

  static find(args) {
    const id = queryBuilder.getParamsFromArgs(args);

    const sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';

    console.log('Finding user...');

    return new Promise(((resolve, reject) => {
      db.get(sql, id, (err, row) => {
        if (err) {
          reject(err);
        }
        console.log('One match found:');
        console.log(`${JSON.stringify(row, null, '\t')}`);
        resolve(new User(row.lastID, row.firstName, row.lastName, row.email));
      });
    }));
  }

  static findAll(data) {
    const params = queryBuilder.getParamsFromArgs(data);

    const sql = 'SELECT * FROM users WHERE firstName = ?';

    console.log('Finding all users matching the constraint...');

    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        }
        const users = rows.map((row) => {
          console.log(`${JSON.stringify(row, null, '\t')}`);
          return new User(row.lastID, row.firstName, row.lastName, row.email);
        });
        resolve(users);
      });
    });
  }

/**
 * TODO - getAttribute() and setAttribute()
 */
}

module.exports = User;
