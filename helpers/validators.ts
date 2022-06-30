export function minLengthValidator(string: string, length: number) {
  if (string.length < length) {
    return false;
  }
  return true;
}
export function maxLengthValidator(string: string, length: number) {
  if (string.length > length) {
    return false;
  }
  return true;
}
export function minMaxLengthValidator(
  string: string,
  minlength: number,
  maxlength: number
) {
  if (string.length < minlength && string.length > maxlength) {
    return false;
  }
  return true;
}
export function validatePhoneNumber(input_str: string) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}
