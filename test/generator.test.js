const { generatePassword } = require("../index");

// Basic tests
console.log("Running safe-password-generator tests...");

const pwd1 = generatePassword();
const pwd2 = generatePassword({ length: 32 });
const pwd3 = generatePassword({ uppercase: false, symbols: false, numbers: false });

console.assert(pwd1.length === 16, "Default length should be 16");
console.assert(pwd2.length === 32, "Length should be 32");
console.assert(/^[a-z]+$/.test(pwd3), "Only lowercase letters expected");

console.log("All tests passed!");
