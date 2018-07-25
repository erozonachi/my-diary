/**
* @author Eneh, James Erozonachi
*
* @description A module that formats API endpoints response before sending to client
*
* */
export default function formatResponse(result) {
  if (result.code <= 201) {
    const response = {
      statusCode: result.code,
      data: JSON.stringify({
        status: 'succeeded',
        data: result.data,
      }),
    };
    return response;
  } else {
    const response = {
      statusCode: result.code,
      data: JSON.stringify({
        status: 'failed',
        data: result.data,
      }),
    };
    return response;
  }
}
