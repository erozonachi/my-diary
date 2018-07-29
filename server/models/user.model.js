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

const query = connector.query('CREATE TABLE account(acct_id SERIAL PRIMARY KEY, first_name VARCHAR(20) not null, last_name VARCHAR(20) not null, username VARCHAR(20) UNIQUE not null, email VARCHAR(45) UNIQUE not null, password VARCHAR(100) not null, avatar_path VARCHAR(50) null, registered_at TIMESTAMP not null, activation_status BOOLEAN DEFAULT(false) null)');
query.then(() => {
  connector.end();
}, err => {
    console.log(err);
})
.catch(error => {
  // Remain silent because account table already exist
});
