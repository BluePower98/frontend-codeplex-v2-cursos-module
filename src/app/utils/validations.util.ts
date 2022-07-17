export class Validation {

  static isNumber(val: any) {
    if (typeof val === 'number' && Validation.isInt(val) || Validation.isFloat(val)) {
      return true;
    }
    return false;
  }

  static isDate(val: any) {
    return val.getDate() ? true : false;
  }

  static isString(val: any) {
    return typeof val !== 'number' ? true : false;
  }

  static isInt(n: any) {
    return Number(n) === n && n % 1 === 0;
  }

  static isFloat(n: any) {
    return Number(n) === n && n % 1 !== 0;
  }
}