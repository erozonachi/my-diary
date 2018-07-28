/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */

import pg from 'pg';
import * as Constants from '../helpers/Constants';

const connector = new pg.Client(Constants.dbConnection);
connector.connect();

const query = connector.query('CREATE TABLE setting(id SERIAL PRIMARY KEY, acct_id INT NOT NULL, reminder_status BOOLEAN DEFAULT(false) NULL, CONSTRAINT setting_account_acct_id_fkey FOREIGN KEY (acct_id) REFERENCES account (acct_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because setting table already exist
});
