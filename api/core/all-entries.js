/**
* @author Eneh, James Erozonachi
*
* @description A module that fetches all entries in entry list
*
* */
import formatResponse from './outputlib/response-format';

export default function fetchAllEntries(diary) {
  let returnResponse = {};
  try {
    const result = {
      code: 200,
      data: diary,
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
