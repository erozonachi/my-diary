/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new user object to a list of users
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
  /**
  * Add entry.
  * @param {object} req - Should contain; user ID and setReminder.
  * @param {object} res - Channel through which results are send to the requesting client.
  * @return {object} Contains status and (error or success) object
  */
  setReminder(req, res) {
    try {
      const { userId, setNotice } = req.params;
      const toggleReminder = new Promise((resolve, reject) => {
        const connector = new pg.Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        connector.connect();
        const result = connector.query('SELECT * FROM setting WHERE acct_id=($1)', [userId]);
        result.then((result) => {
          const reminderStatus = String.toString(setNotice).toLowerCase() === 'on'? true : false;
          if (result.rowCount > 0) {
            const reminderResult = connector.query('UPDATE setting SET reminder_status=($1) WHERE acct_id=($2)', [reminderStatus, userId]);
            reminderResult.then((result) => {
              resolve(result);
            }, (error) => {
              reject(error);
            });
          } else {
            const reminderResult = connector.query('INSERT INTO setting(reminder_status, acct_id) values($1, $2)',[reminderStatus, userId]);
            reminderResult.then((result) => {
              resolve(result);
            }, (error) => {
              reject(error);
            });
          }
        }, (error) => {
          reject(error);
        });
      });
      toggleReminder.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 'fail', message: Constants.systemError });
        } else {
          return res.status(200).json({ status: 'success', message: `Daily reminder turned ${setNotice}` });
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  }
};
