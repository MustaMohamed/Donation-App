import { validationConstants } from '../constants';

export const isEmpty = (data: any): boolean => {
  return data === undefined || data === null || (Object.keys(data).length === 0 && data.constructor === Object) || data == [] || data === '' || data === '' || data === 0 || false;
};

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const containsSpecialCharacters = (value: string): boolean => {
  return !(/^[a-zA-Z0-9\-\/_]*$/.test(value));
};

export const validateInput = (validationTypes: any[], inputValue: any) => {
  let valid = true;
  validationTypes && validationTypes.forEach((item, idx) => {
    switch (item) {
      case validationConstants.NOT_EMPTY:
        valid = valid && (!isEmpty(inputValue));
        break;
      case validationConstants.VALID_EMAIL:
        valid = valid && isValidEmail(inputValue);
        break;
      case validationConstants.CONTAINS_SPECIAL_CHARACTERS:
        const sv = containsSpecialCharacters(inputValue);
        valid = valid && (!sv);
        break;
    }
  });
  return valid;
};


export default class ValidationService {
  public static isEmpty = isEmpty;

  public static isValidEmail = isValidEmail;

  public static validateInput = validateInput;

  public static containsSpecialCharacters = containsSpecialCharacters;

}