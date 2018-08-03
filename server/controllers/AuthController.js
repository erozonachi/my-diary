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
import Mail from '../helpers/Mail';

export default {
  signUp(req, res) {
    try {
      const user = req.body;
      user.registeredAt = new Date().toLocaleString();
      const createUser = new Promise((resolve, reject) => {
        bcrypt.hash(user.password, Constants.hashSaltRounds).then((hash) => {
          const connector = new pg.Client(`${process.env.DATABASE_URL}`/* {
            connectionString: process.env.DATABASE_URL,
            ssl: true,
          } */);
          connector.connect();
          const checkUniqueness = connector.query('SELECT * FROM account WHERE username=($1) OR email=($2)', [user.username, user.email]);
          checkUniqueness.then(result => {
            if (result.rowCount > 0) {
              if (result.rows[0].username === user.username) {
                const error = {status: 'fail', message: 'Username is taken'};
                reject(error);
              } else {
                const error = {status: 'fail', message: 'Email already in use'};
                reject(error);
              }
            } else {
              const result = connector.query('INSERT INTO account(first_name, last_name, username, email, password, registered_at) values($1, $2, $3, $4, $5, $6)',
              [user.firstName, user.lastName, user.username, user.email, hash, user.registeredAt]);
              result.then((result) => {
                resolve(result);
              }, (error) => {
                reject(error);
              });
            }
          }, error => {
            reject(error);
          })
        }, (error) => {
          reject(error);
        });
      });
      createUser.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 'fail', message: Constants.systemError});
        } else {
          return res.status(201).json({ status: 'success', data: user });
        }
      }, (error) => {
        if (error.status === 'fail') {
          return res.status(400).json(error);
        }
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
  signIn(req, res) {
    try {
      const { loginName, loginPassword } = req.body;
      const authResult = {};
      const connector = new pg.Client(`${process.env.DATABASE_URL}`/* {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      } */);
      connector.connect();
      const result = connector.query('SELECT * FROM account WHERE username=($1) OR email=($1)', [loginName]);
      result.then((result) => {
        if (result.rowCount <= 0){
          return res.status(401).json({ status: 'fail', message: 'Authentication failed: incorrect username or password' });
        } else {
          const user = result.rows[0];
          authResult.id = user.acct_id;
          authResult.name = `${user.first_name} ${user.last_name}`;
          authResult.email = user.email;
          bcrypt.compare(loginPassword, user.password)
          .then((result) => {
            if (!result) {
              return res.status(401).json({ status: 'fail', message: 'Authentication failed: incorrect username or password' });
            }
            const tokenPaylod = {
              id: authResult.id,
              loginName,
            }
            const token = jwt.sign(tokenPaylod, process.env.SECRET_KEY, {expiresIn: '1d'});
            if (!token) {
              return res.status(500).json({ status: 'fail', message: Constants.systemError});
            } else {
              const reminderMsg = {
                from: "noreply.appmydiary@gmail.com",
                to: authResult.email,
                subject: 'Login Notification',
                text: `Hi ${authResult.name}! Your account was logged into few minutes ago. If you are aware of this, please quickly reset your password`,
              };
              Mail.messanger().sendMail(reminderMsg, (error, info) => {
                  if (error) {  return error; }
                  else if (info) {  return info; }
              });
              authResult.accessToken = token;
              return res.status(200).json({ status: 'success', message: 'Logged in successfully', data: authResult });
            }
          }, (error) => {
            return res.status(500).json({ status: 'fail', message: Constants.systemError});
          })
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      })
      .catch((error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
  isAuthenticated(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({ status: 'fail', message: 'Authentication failed.' });
        } else {
          if (parseInt(req.params.userId, 10) !== parseInt(decoded.id)) {
            return res.status(401).json({ status: 'fail', message: 'Compromised access token'});
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).send({ 
        status: 'fail', 
        message: 'User not authenticated',
      });
    }
  }
}
