/**
* @author Eneh, James Erozonachi
*
* @description A module that validates fields in request payloads
*
* */

export default {
  isEmpty(field) {
    if (field.trim() === '') {
      return true;
    } else {
      return false;
    }
  },
  isNumber(field) {
    if (!Number.isNaN(field)) {
      return true;
    } else {
      return false;
    }
  },
  maxLength(field, max) {
    if (field.length > max) {
      return false;
    } else {
      return true;
    }
  },
  minLength(field, min) {
    if (field.length < min) {
        return false;
    } else {
      return true;
    }
  },
  isAlpha(field) {
    if (RegExp(/^[a-zA-Z]+$/, 'g').test(field)) {
      return true;
    } else {
      return false;
    }
  },
  isNumeric(field) {
    if(RegExp(/^[0-9.]+$/).test(field)) {
    return true;
    } else {
    return false;
    }
  },
  isEmail(field) {
    if(RegExp(/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/).test(field)) {
      return true;
    } else {
      return false;
    }
  }
}