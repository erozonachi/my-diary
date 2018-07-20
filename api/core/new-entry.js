/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new entry object to an entry list
*
* */
import formatResponse from './outputlib/response-format';

export default function newEntry(entryInfo, diary) {
  let returnValue = {};
  try {
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
    diary.push(entry);
    const result = {
      code: 201,
      data: {
        message: 'New entry created successfully',
      },
    };
    returnValue = formatResponse(result);
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
