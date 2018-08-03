/**
* @author Eneh, James Erozonachi
*
* @description Entry resource module
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
  /**
  * Add entry.
  * @param {object} req - Should contain; title, content and optionally a conclusion.
  * @param {object} res - Channel through which results are send to the requesting client.
  * @return {object} Contains status and (error or success) object
  */
  create(req, res) {
    try {
      const entry = req.body;
      const { userId } = req.params;
      entry.createdAt = new Date().toLocaleString();
      const createEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        connector.connect();
        const result = connector.query('INSERT INTO entry(acct_id, title, description, conclusion, created_at) values($1, $2, $3, $4, $5)',
        [userId, entry.title, entry.content, entry.conclusion, entry.createdAt]);
        result.then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
      createEntry.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 'fail', message: Constants.systemError});
        } else {
          return res.status(201).json({ status: 'success', message: 'Created successfully', data: entry});
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
  /**
  * Modify saved entry.
  * @param {object} req - Should contain; title, content and optionally a conclusion.
  * @param {object} res - Channel through which results are send to the requesting client.
  * @return {object} Contains status and (error or success) object
  */
  update(req, res) {
    try {
      const entry = req.body;
      const { userId, entryId } = req.params;
      entry.updatedAt = new Date().toLocaleString();
      const updateEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        connector.connect();
        const result = connector.query('UPDATE entry SET title=($1), description=($2), conclusion=($3), updated_at=($4) WHERE id=($5) AND acct_id=($6)',
        [entry.title, entry.content, entry.conclusion, entry.updatedAt, entryId, userId]);
        result.then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
      updateEntry.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 'fail', message: Constants.notFound});
        } else {
          return res.status(200).send({ status: 'success', message: 'Modified successfully', data: entry });
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
  /**
  * Add entry.
  * @param {object} req - Should contain; user ID and entry ID.
  * @param {object} res - Channel through which results are send to the requesting client.
  * @return {object} Contains status and (error or success) object
  */
  read(req, res) {
    try {
      const { userId, entryId } = req.params;
      const readEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        connector.connect();
        const result = connector.query('SELECT * FROM entry WHERE id=($1) AND acct_id=($2)', [entryId, userId]);
        result.then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
      readEntry.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 'fail', message: Constants.notFound});
        } else {
          return res.status(200).json({ status: 'success', data: result.rows });
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
  /**
  * Add entry.
  * @param {object} req - Should contain; user ID.
  * @param {object} res - Channel through which results are send to the requesting client.
  * @return {object} Contains status and (error or success) object
  */
  readAll(req, res) {
    try {
      const { userId } = req.params;
      const readEntry = new Promise((resolve, reject) => {
        const connector = new pg.Client({
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        });
        connector.connect();
        const result = connector.query('SELECT * FROM entry WHERE acct_id=($1) ORDER BY created_at DESC', [userId]);
        result.then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
      });
      readEntry.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 'fail', message: Constants.notFound});
        } else {
          return res.status(200).json({ status: 'success', data: result.rows });
        }
      }, (error) => {
        return res.status(500).json({ status: 'fail', message: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: Constants.systemError});
    }
  },
};
