/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */

import pg from 'pg';

const connector = new pg.Client(process.env.DATABASE_URL/* {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
} */);
connector.connect();

const query = connector.query('CREATE TABLE setting(id SERIAL PRIMARY KEY, acct_id INT NOT NULL, reminder_status BOOLEAN NOT NULL, CONSTRAINT setting_account_acct_id_fkey FOREIGN KEY (acct_id) REFERENCES account (acct_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because setting table already exist
});
