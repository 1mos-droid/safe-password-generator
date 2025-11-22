/**
 * safe-password-generator
 * Advanced secure password generator
 */
const crypto = require("crypto");

function generatePassword(options = {}) {
  const length = options.length || 16;
  const upper = options.uppercase !== false;
  const lower = options.lowercase !== false;
  const numbers = options.numbers !== false;
  const symbols = options.symbols !== false;
  const readable = options.readable === true;

  let chars = "";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";

  if (readable) {
    chars = chars.replace(/[Il1O0]/g, "");
  }

  if (!chars) throw new Error("No character types selected for password");

  // Use crypto for secure random bytes
  const charArray = chars.split("");
  let password = "";
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += charArray[randomBytes[i] % charArray.length];
  }

  return password;
}

function getPasswordInfo(password) {
  const length = password.length;
  const types = {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?]/.test(password),
  };

  // Entropy estimation: log2(charset^length)
  let charsetSize = 0;
  if (types.upper) charsetSize += 26;
  if (types.lower) charsetSize += 26;
  if (types.numbers) charsetSize += 10;
  if (types.symbols) charsetSize += 32;
  const entropy = Math.round(length * Math.log2(charsetSize));

  let strength = "very weak";
  if (entropy > 128) strength = "very strong";
  else if (entropy > 80) strength = "strong";
  else if (entropy > 60) strength = "medium";
  else if (entropy > 40) strength = "weak";

  return { password, length, entropy, strength, includes: types };
}

module.exports = { generatePassword, getPasswordInfo };
