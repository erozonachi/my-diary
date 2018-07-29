/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
import nodemailer from 'nodemailer';
import pg from 'pg';
import * as Constants from './Constants';

export default {
  sendReminder() {
    const transporter = nodemailer.createTransport({ // https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
      service: "gmail",
      auth: {
        user: "noreply.appmydiary@gmail.com",
        pass: "09063912145"
      }
    });
    try {
      const reminder = new Promise((resolve, reject) => {
        const connector = new pg.Client(Constants.dbConnection);
        connector.connect();
        const result = connector.query('SELECT a.email, s.reminder_status FROM account AS a, setting AS s WHERE a.acct_id=s.acct_id AND s.reminder_status=true');
        result.then((result) => {
          if (result.rowCount > 0) {
            const emailList = result.rows.map(row => row.email).join(',');
            const reminderMsg = {
              from: "noreply.appmydiary@gmail.com",
              to: `${emailList}`,
              subject: 'Daily Reminder to Add new Entry',
              text: 'Hi User! This mail serves as a mild reminder to add your today\'s thoughts/feelings to your diary, if you haven\'t.',
            };
            transporter.sendMail(reminderMsg, (error, info) => {
                if (error) {
                  reject(error);
                }
                else if (info) {
                  resolve(info);
                }
            })
          }
        }, (error) => {
          reject(error);
        });
      });
      reminder.then((result) => {
        return ; // exit
      }, (error) => {
        return // die error;
      });
    } catch (error) {
      return // die error;
    }
  }
}
