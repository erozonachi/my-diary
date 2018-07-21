/**
* @author Eneh, James Erozonachi
*
* @description A module that updates existing entry object
*
* */
import formatResponse from './outputlib/response-format';

export default function modifyEntry(id, entryInfo, diary) {
  let returnValue = {};
  const isIdInteger = Number.isInteger(parseInt(id, 10));
  try {
    if (id === null || id === undefined) {
      const error = {
        code: 400,
        data: { message: 'Entry ID is required' },
      };
      throw error;
    }
    if (!isIdInteger) {
      const error = {
        code: 400,
        data: { message: 'Invalid entry ID' },
      };
      throw error;
    }
    if (parseInt(id, 10) < 0) {
      const error = {
        code: 400,
        data: { message: 'Entry ID cannot be a negative number' },
      };
      throw error;
    }
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
    const entry = diary[parseInt(id, 10)];
    if (entry === null || entry === undefined) {
      const result = {
        code: 404,
        data: {
          message: 'ID out of range! No entry found for the specified Id',
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
        data: {
          message: 'Entry modified successfully',
        },
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
