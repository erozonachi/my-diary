/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new user object to a list of users
*
* */
import diary from '../models/diary';
import * as Constants from '../helpers/Constants';

export default {
  create(req, res) {
    try {
      const registeredAt = new Date().toLocaleString();
      const newUser = req.body;
      newUser.entries = [];
      newUser.registeredAt = registeredAt;
      diary.push(newUser);
      const key = diary.length - 1;
      newUser.id = key;
      res.status(201).send(JSON.stringify(newUser));
    } catch (error) {
      res.status(500).send(Constants.systemError);
    }
  },
};
