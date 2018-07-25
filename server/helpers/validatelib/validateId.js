/**
* @author Eneh, James Erozonachi
*
* @description A module that validates user or entry Id
*
* */
export default function validateId(id, type, diary = []) {
  const isIdInteger = Number.isInteger(parseInt(id, 10));
  if (id === null || id === undefined) {
    const error = {
      code: 400,
      data: { message: `${type} ID is required` },
    };
    throw error;
  }
  if (!isIdInteger) {
    const error = {
      code: 400,
      data: { message: `Invalid ${type} ID` },
    };
    throw error;
  }
  if (parseInt(id, 10) < 0) {
    const error = {
      code: 400,
      data: { message: `${type} ID cannot be a negative number` },
    };
    throw error;
  }
  if (type === 'User' && !diary[parseInt(id, 10)]) {
    const error = {
      code: 404,
      data: {
        message: 'ID out of range! No user found for the specified Id',
      },
    };
    throw error;
  }
}
