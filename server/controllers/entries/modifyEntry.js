/**
* @author Eneh, James Erozonachi
*
* @description A module that updates existing entry object
*
* */
import validateId from '../../helpers/validatelib/validateId';
import formatResponse from '../../helpers/outputlib/formatResponse';

export default function modifyEntry(userId, id, entryInfo, diary) {
  let returnValue = {};
  try {
    validateId(userId, 'User', diary);
    validateId(id, 'Entry');
    if (entryInfo.title.trim() === '' || entryInfo.title === null || entryInfo.title === undefined) {
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
    if (entryInfo.description.trim() === '' || entryInfo.description === null || entryInfo.description === undefined) {
      const error = {
        code: 400,
        data: { message: 'Entry description is required' },
      };
      throw error;
    }
    const entry = diary[parseInt(userId, 10)].entries[parseInt(id, 10)];
    if (entry === null || entry === undefined) {
      const result = {
        code: 404,
        data: {
          message: 'ID out of range! No Entry found for the specified Id',
        },
      };
      returnValue = formatResponse(result);
    } else {
      if (entry.title !== entryInfo.title) {
        entry.title = entryInfo.title;
      }
      if (entry.description !== entryInfo.description) {
        entry.description = entryInfo.description;
      }
      if (entry.conclusion !== entryInfo.conclusion) {
        entry.conclusion = entryInfo.conclusion;
      }
      const updatedAt = new Date().toLocaleString();
      entry.updatedAt = updatedAt;
      const result = {
        code: 200,
        data: entry,
      };
      returnValue = formatResponse(result);
    }
  } catch (error) {
    if (error.code === 400) {
      returnValue = formatResponse(error);
    } else {
      const result = {
        code: 500,
        data: {
          message: 'Unable to process request at the moment',
        },
      };
      returnValue = formatResponse(result);
    }
  }
  return returnValue;
}
