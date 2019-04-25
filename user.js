
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
    const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL)';

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

    const sql = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';

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

  static find(arg) {
    const param = queryBuilder.getClauseParamsFromArgs(arg);

    const sql = `SELECT * FROM users WHERE ${param} LIMIT 1`;

    console.log('Finding user...');

    return new Promise(((resolve, reject) => {
      db.get(sql, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    }));
  }

  static findAll(args) {
    const params = queryBuilder.getClauseParamsFromArgs(args);

    const sql = `SELECT * FROM users WHERE ${params}`;

    console.log('Finding all users matching the constraint...');

    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  getAttribute(arg) {
    const sql = `SELECT ${arg} FROM users WHERE id = ${this.id}`;

    return new Promise(((resolve, reject) => {
      db.get(sql, (err, row) => {
        if (err) {
          reject(err);
        }
        console.log(row);
        resolve(row);
      });
    }));
  }

  setAttribute(arg) {
    const param = queryBuilder.getClauseParamsFromArgs(arg);

    const sql = `UPDATE users SET ${param} WHERE id = ${this.id}`;

    return new Promise((resolve, reject) => {
      db.run(sql, (err, row) => {
        if (err) {
          reject(err);
        }
        console.log('User successfully updated!');
        resolve(row);
      });
    });
  }
}

module.exports = User;
