import bcrypt from "bcryptjs";

export function saltAndHashPassword(password: string) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export function comparePasswords(password: string, hash: string) {
  const isPasswordValid = bcrypt.compareSync(password, hash); // Synchronously compare the password with the hash
  return isPasswordValid; // Return the result directly as a boolean
}

export function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomString = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  return randomString;
}

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


export function isEmptyObject(obj : Object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

