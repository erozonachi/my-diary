/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new entry object to an entry list
*
* */
import validateId from '../../helpers/validatelib/validateId';
import formatResponse from '../../helpers/outputlib/formatResponse';

export default function newEntry(userId, entryInfo, diary) {
  let returnValue = {};
  try {
    validateId(userId, 'User', diary);
    if (entryInfo.title.trim() === '') {
      const error = {
        code: 400,
        data: { message: 'Entry title is required' },
      };
      throw error;
    }
    if (entryInfo.title.length > 50) {
      const error = {
        code: 400,
        data: { message: 'Entry title exceeds max character length of 50' },
      };
      throw error;
    }
    if (entryInfo.description.trim() === '') {
      const error = {
        code: 400,
        data: { message: 'Entry description is required' },
      };
      throw error;
    }
    const createdAt = new Date().toLocaleString();
    const entry = {
      title: entryInfo.title,
      description: entryInfo.description,
      conclusion: entryInfo.conclusion,
      createdAt,
    };
    diary[parseInt(userId, 10)].entries.push(entry);
    const key = diary[parseInt(userId, 10)].entries.length - 1;
    entry.id = key;
    const result = {
      code: 201,
      data: entry,
    };
    returnValue = formatResponse(result);
  } catch (error) {
    if (error.code < 500) {
      returnValue = formatResponse(error);
    } else {
      const result = {
        code: 500,
        data: {
          message: error.message,
        },
      };
      returnValue = formatResponse(result);
    }
  }
  return returnValue;
}
