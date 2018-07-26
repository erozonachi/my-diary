/**
* @author Eneh, James Erozonachi
*
* @description Entry resource module
*
* */
import diary from '../models/diary';
import * as Constants from '../helpers/Constants';

export default {
  create(req, res) {
    try {
      const { userId } = req.params;
      if (diary[userId] === null || diary[userId] === undefined) {
        return res.status(404).send(Constants.notUser);
      }
      const createdAt = new Date().toLocaleString();
      const newEntry = req.body;
      newEntry.createdAt = createdAt;
      diary[userId].entries.push(newEntry);
      const key = diary[userId].entries.length - 1;
      newEntry.id = key;
      return res.status(201).send(JSON.stringify(newEntry));
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
  update(req, res) {
    try {
      const { userId, entryId } = req.params;
      if (!diary[userId]) {
        return res.status(404).send(Constants.notUser);
      }
      const entry = diary[userId].entries[entryId];
      if (entry === null || entry === undefined) {
        return res.status(404).send(Constants.notEntry);
      }
      entry.title = req.body.title;
      entry.description = req.body.description;
      if (req.body.conclusion) {
        entry.conclusion = req.body.conclusion;
      }
      const updatedAt = new Date().toLocaleString();
      entry.updatedAt = updatedAt;
      return res.status(200).send(JSON.stringify(entry));
    } catch (error) {
      return res.status(500).send(error.message/* Constants.systemError */);
    }
  },
  read(req, res) {
    try {
      const { userId, entryId } = req.params;
      if (!diary[userId]) {
        return res.status(404).send(Constants.notUser);
      }
      const entry = diary[parseInt(userId, 10)].entries[parseInt(entryId, 10)];
      if (!entry) {
        return res.status(404).send(Constants.notEntry);
      }
      return res.status(200).send(JSON.stringify(entry));
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
  readAll(req, res) {
    try {
      const { userId } = req.params;
      if (!diary[userId]) {
        return res.status(404).send(Constants.notUser);
      }
      const { entries } = diary[parseInt(userId, 10)].entries;
      if (!entries) {
        return res.status(404).send(Constants.notEntry);
      }
      return res.status(200).send(JSON.stringify(entries));
    } catch (error) {
      return res.status(500).send(Constants.systemError);
    }
  },
};
