/**
* @author Eneh, James Erozonachi
*
* @description A module that fetches a single entry from entry list
*
* */
import validateId from '../../helpers/validatelib/validateId';
import formatResponse from '../../helpers/outputlib/formatResponse';

export default function fetchSingleEntry(userId, id, diary) {
  let returnResponse = {};
  try {
    validateId(userId, 'User', diary);
    validateId(id, 'Entry');
    const entry = diary[parseInt(userId, 10)].entries[parseInt(id, 10)];
    if (entry === null || entry === undefined) {
      const error = {
        code: 404,
        data: {
          message: 'ID out of range! No Entry found for the specified Id',
        },
      };
      throw error;
    } else {
      const result = {
        code: 200,
        data: entry,
      };
      returnResponse = formatResponse(result);
    }
  } catch (error) {
    if (error.code < 500) {
      returnResponse = formatResponse(error);
    } else {
      const result = {
        code: 500,
        data: {
          message: 'Unable to process request at the moment',
        },
      };
      returnResponse = formatResponse(result);
    }
  }
  return returnResponse;
}
