import isEmail from 'is-email';

export function validateEmail(email) {
  return isEmail(email) || 'That email address is invalid.';
}

export function validateUsername(username) {
  if (username.length < 3) {
    return 'Usernames have to be at least 3 characters long.';
  }
  if (username.length > 32) {
    return 'Usernames can be at most 32 characters long.';
  }
  if (!/^[^\s]+$/.test(username)) {
    return 'Usernames can\'t contain spaces.';
  }
  return true;
}

export function validatePassword(password) {
  if (password.length < 8) {
    return 'Passwords have to be at least 8 characters long.';
  }
  return true;
}
