/**
* @author Eneh, James Erozonachi
*
* @description A module that fetches all entries in entry list
*
* */
import validateId from './validatelib/validate-id';
import formatResponse from './outputlib/response-format';

export default function fetchAllEntries(userId, diary) {
  let returnResponse = {};
  try {
    validateId(userId, 'User', diary);
    const result = {
      code: 200,
      data: diary[parseInt(userId, 10)].entries,
    };
    returnResponse = formatResponse(result);
  } catch (error) {
    const result = {
      code: 500,
      data: {
        message: 'Unable to process request at the moment',
      },
    };
    returnResponse = formatResponse(result);
  }
  return returnResponse;
}
