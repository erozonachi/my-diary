/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new user object to a list of users
*
* */
import bcrypt from 'bcrypt';
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
  create(req, res) {
    try {
      const user = req.body;
      user.registeredAt = new Date().toLocaleString();
      const createUser = new Promise((resolve, reject) => {
        bcrypt.hash(user.password, Constants.hashSaltRounds).then((hash) => {
          const connector = new pg.Client(Constants.dbConnection);
          connector.connect();
          const result = connector.query('INSERT INTO account(first_name, last_name, username, email, password, registered_at) values($1, $2, $3, $4, $5, $6)',
          [user.firstName, user.lastName, user.username, user.email, hash, user.registeredAt]);
          result.then((result) => {
            resolve(result);
          }, (err) => {
            reject(err);
          });
        }, (err) => {
          reject(err);
        });
      });
      createUser.then((result) => {
        if (result.rowCount <= 0) {
          res.status(500).send(Constants.systemError);
        } else {
          user.status = true;
          res.status(201).send(JSON.stringify(user));
        }
      }, (err) => {
        res.status(500).send('System could not create user, try again');
      });
    } catch (error) {
      res.status(500).send(error.message/* Constants.systemError */);
    }
  },
};
