/**
* @author Eneh, James Erozonachi
*
* @description Entry resource module
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
  create(req, res) {
    try {
      const entry = req.body;
      const { userId } = req.params;
      entry.createdAt = new Date().toLocaleString();
      const createEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client(Constants.dbConnection);
        connector.connect();
        const result = connector.query('INSERT INTO entry(acct_id, title, description, conclusion, created_at) values($1, $2, $3, $4, $5)',
        [userId, entry.title, entry.description, entry.conclusion, entry.createdAt]);
        result.then((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
      createEntry.then((result) => {
        if (result.rowCount <= 0) {
          res.status(500).send(Constants.systemError);
        } else {
          entry.status = true;
          res.status(201).send(JSON.stringify(entry));
        }
      }, (err) => {
        res.status(500).send(Constants.systemError);
      });
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
  update(req, res) {
    try {
      const entry = req.body;
      const { userId, entryId } = req.params;
      entry.updatedAt = new Date().toLocaleString();
      const updateEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client(Constants.dbConnection);
        connector.connect();
        const result = connector.query('UPDATE entry SET title=($1), description=($2), conclusion=($3), updated_at=($4) WHERE id=($5) AND acct_id=($6)',
        [entry.title, entry.description, entry.conclusion, entry.updatedAt, entryId, userId]);
        result.then((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
      updateEntry.then((result) => {
        if (result.rowCount <= 0) {
          res.status(404).send(Constants.notFound);
        } else {
          entry.status = true;
          res.status(200).send(JSON.stringify(entry));
        }
      }, (err) => {
        res.status(500).send(Constants.systemError);
      });
    } catch (error) {
      return res.status(500).send(error.message/* Constants.systemError */);
    }
  },
  read(req, res) {
    try {
      const { userId, entryId } = req.params;
      const readEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client(Constants.dbConnection);
        connector.connect();
        const result = connector.query('SELECT * FROM entry WHERE id=($1) AND acct_id=($2)', [entryId, userId]);
        result.then((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
      readEntry.then((result) => {
        if (result.rowCount <= 0) {
          res.status(404).send(Constants.notFound);
        } else {
          res.status(200).send(JSON.stringify(result.rows));
        }
      }, (err) => {
        res.status(500).send(Constants.systemError);
      });
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
  readAll(req, res) {
    try {
      const { userId } = req.params;
      const readEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client(Constants.dbConnection);
        connector.connect();
        const result = connector.query('SELECT * FROM entry WHERE acct_id=($1) ORDER BY created_at DESC', [userId]);
        result.then((result) => {
          resolve(result);
        }, (err) => {
          reject(err);
        });
      });
      readEntry.then((result) => {
        if (result.rowCount <= 0) {
          res.status(404).send(Constants.notFound);
        } else {
          res.status(200).send(JSON.stringify(result.rows));
        }
      }, (err) => {
        res.status(500).send(Constants.systemError);
      });
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
};
