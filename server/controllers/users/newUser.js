/**
* @author Eneh, James Erozonachi
*
* @description A module that saves new user object to a list of users
*
* */
import formatResponse from '../../helpers/outputlib/formatResponse';

export default function newUser(user, diary) {
  let returnValue = {};
  try {
    if (user.firstName.trim() === '' || user.firstName === null || user.firstName === undefined) {
      const error = {
        code: 400,
        data: { message: 'First name is required' },
      };
      throw error;
    }
    if (!/^[a-z]+$/i.test(user.firstName)) {
      const error = {
        code: 400,
        data: { message: 'First name is not combination of letters' },
      };
      throw error;
    }
    if (user.firstName.length > 20) {
      const error = {
        code: 400,
        data: { message: 'First name exceeds max character length of 20' },
      };
      throw error;
    }
    if (user.lastName.trim() === '' || user.lastName === null || user.lastName === undefined) {
      const error = {
        code: 400,
        data: { message: 'Last name is required' },
      };
      throw error;
    }
    if (!/^[a-z]+$/i.test(user.lastName)) {
      const error = {
        code: 400,
        data: { message: 'Last name is not combination of letters' },
      };
      throw error;
    }
    if (user.lastName.length > 20) {
      const error = {
        code: 400,
        data: { message: 'Last name exceeds max character length of 20' },
      };
      throw error;
    }
    if (user.username.trim() === '' || user.username === null || user.username === undefined) {
      const error = {
        code: 400,
        data: { message: 'Username is required' },
      };
      throw error;
    }
    if (!/^[a-z0-9]+$/i.test(user.username)) {
      const error = {
        code: 400,
        data: { message: 'Username can only contain letters and digits' },
      };
      throw error;
    }
    if (user.email.trim() === '' || user.email === null || user.email === undefined) {
      const error = {
        code: 400,
        data: { message: 'Email is required' },
      };
      throw error;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(user.email)) {
      const error = {
        code: 400,
        data: { message: 'Invalid email format' },
      };
      throw error;
    }
    if (user.password === '' || user.password === null || user.password === undefined) {
      const error = {
        code: 400,
        data: { message: 'Password is required' },
      };
      throw error;
    }
    if (user.password.length < 10) {
      const error = {
        code: 400,
        data: { message: 'Password not up to 10 character length' },
      };
      throw error;
    }
    if (/^[a-z]+$/i.test(user.password) || /^[0-9]+$/i.test(user.password)) {
      const error = {
        code: 400,
        data: { message: 'Weak password: mix letters, numbers, or special characters' },
      };
      throw error;
    }
    const registeredDateTime = new Date().toLocaleString();
    const userObject = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      entries: [],
      registeredDateTime,
    };
    diary.push(userObject);
    const key = diary.length - 1;
    userObject.id = key;
    const result = {
      code: 201,
      data: userObject,
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
