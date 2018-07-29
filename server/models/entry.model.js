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

const query = connector.query('CREATE TABLE entry(id SERIAL PRIMARY KEY, acct_id int NOT NULL, title VARCHAR(50) NOT NULL, description VARCHAR(500) NOT NULL, conclusion VARCHAR(200) NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NULL, CONSTRAINT entry_account_acct_id_fkey FOREIGN KEY (acct_id) REFERENCES account (acct_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});