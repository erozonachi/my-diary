/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */

import pg from 'pg';

const connector = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
connector.connect();

const query = connector.query('CREATE TABLE otp(id SERIAL, acct_id INT NOT NULL, pass_code INT NOT NULL, type BOOLEAN DEFAULT(false) NOT NULL, usage_status BOOLEAN DEFAULT(false) NULL, created_at TIMESTAMP NOT NULL,expires_at TIMESTAMP NOT NULL, PRIMARY KEY (id, pass_code), CONSTRAINT otp_account_acct_id_fkey FOREIGN KEY (acct_id) REFERENCES account (acct_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because otp table already exist
});
