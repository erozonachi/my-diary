/**
* @author Eneh, James Erozonachi
*
* @description A module that fetches a single entry from entry list
*
* */
import formatResponse from './outputlib/response-format';

export default function fetchSingleEntry(id, diary) {
  let returnResponse = {};
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
    const entry = diary[parseInt(id, 10)];
    if (entry === null || entry === undefined) {
      const result = {
        code: 404,
        data: {
          message: 'ID out of range! No entry found for the specified Id',
        },
      };
      returnResponse = formatResponse(result);
    } else {
      const result = {
        code: 200,
        data: entry,
      };
      returnResponse = formatResponse(result);
    }
  } catch (error) {
    if (error.code === 400) {
      returnResponse = formatResponse(error);
    } else {
      const result = {
        code: 500,
        data: {
          message: 'Unable to process request at the moment',
        },
      };
      console.log(error.message);
      returnResponse = formatResponse(result);
    }
  }
  return returnResponse;
}
