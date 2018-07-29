/**
* @author Eneh, James Erozonachi
*
* @description Authentication Controllers module
*
* */
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Constants from '../helpers/Constants';

export default {
  signUp(req, res) {
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
          return res.status(500).json({ status: 'failed', message: Constants.systemError});
        } else {
          return res.status(201).json({ status: 'succeeded', data: user });
        }
      }, (err) => {
        return res.status(500).json({ status: 'failed', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'failed', message: Constants.systemError});
    }
  },
  signIn(req, res) {
    try {
      const { loginName, loginPassword } = req.body;
      const authResult = {};
      const connector = new pg.Client(Constants.dbConnection);
      connector.connect();
      const result = connector.query('SELECT * FROM account WHERE username=($1) OR email=($1)', [loginName]);
      result.then((result) => {
        if (result.rowCount <= 0){
          return res.status(401).json({ status: 'failed', message: 'Invalid login credentials' });
        } else {
          const user = result.rows[0];
          authResult.id = user.acct_id;
          authResult.name = `${user.first_name} ${user.last_name}`;
          authResult.email = user.email;
          bcrypt.compare(loginPassword, user.password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({ status: 'failed', message: 'Invalid login credentials' });
            }
            const tokenPaylod = {
              id: authResult.id,
              loginName,
              loginPassword,
            }
            const token = jwt.sign(tokenPaylod, process.env.SECRET_KEY, {expiresIn: '1d'});
            if (!token) {
              return res.status(500).json({ status: 'failed', message: Constants.systemError});
            } else {
              authResult.accessToken = token;
              return res.status(200).json({ status: 'succeeded', data: authResult });
            }
          }, (error) => {
            return res.status(500).json({ status: 'failed', message: Constants.systemError});
          })
        }
      }, (error) => {
        return res.status(500).json({ status: 'failed', message: Constants.systemError});
      })
      .catch((error) => {
        return res.status(500).json({ status: 'failed', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'failed', message: Constants.systemError});
    }
  },
  isAuthourized(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({ status: 'failed', message: 'Failed to authenticate access token.' });
        } else {
          if (req.params.userId != decoded.id) {
            return res.status(401).json({ status: 'failed', message: 'Compromised access token'});
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(403).send({ 
        status: 'failed', 
        message: 'Access token not provided',
      });
    }
  }
}
