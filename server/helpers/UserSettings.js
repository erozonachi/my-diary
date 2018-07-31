/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
import pg from 'pg';
import Mail from './Mail';

export default {
  sendReminder() {
    try {
      const reminder = new Promise((resolve, reject) => {
        const connector = new pg.Client(`${process.env.DATABASE_URL}`/* {
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        } */);
        connector.connect();
        const result = connector.query('SELECT a.email, s.reminder_status FROM account AS a, setting AS s WHERE a.acct_id=s.acct_id AND s.reminder_status=true');
        result.then((result) => {
          if (result.rowCount > 0) {
            const emailList = result.rows.map(row => row.email).join(',');
            const reminderMsg = {
              from: "noreply.appmydiary@gmail.com",
              to: emailList,
              subject: 'Daily Reminder to Add new Entry',
              text: 'Hi User! This mail serves as a mild reminder to add your today\'s thoughts/feelings to your diary, if you haven\'t.',
            };
            Mail.messanger().sendMail(reminderMsg, (error, info) => {
                if (error) {
                  reject(error);
                }
                else if (info) {
                  resolve(info);
                }
            });
          }
        }, (error) => {
          reject(error);
        });
      });
      reminder.then((result) => {
        return ; // exit
      }, (error) => {
        error;
      });
    } catch (error) {
      return // die error;
    }
  }
}
