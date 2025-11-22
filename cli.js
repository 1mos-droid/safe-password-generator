#!/usr/bin/env node
const { generatePassword, getPasswordInfo } = require("./index");
const readline = require("readline");

const args = process.argv.slice(2);

const options = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  readable: false,
};

let preset = null;
let outputJSON = false;
let wizard = false;

args.forEach(arg => {
  if (arg.startsWith("--length=")) options.length = parseInt(arg.split("=")[1], 10);
  if (arg === "--no-upper") options.uppercase = false;
  if (arg === "--no-lower") options.lowercase = false;
  if (arg === "--no-numbers") options.numbers = false;
  if (arg === "--no-symbols") options.symbols = false;
  if (arg === "--readable") options.readable = true;
  if (arg.startsWith("--preset=")) preset = arg.split("=")[1];
  if (arg === "--json") outputJSON = true;
  if (arg === "--wizard") wizard = true;
});

const applyPreset = name => {
  switch (name) {
    case "weak":
      options.length = 8;
      options.uppercase = false;
      options.lowercase = true;
      options.numbers = true;
      options.symbols = false;
      break;
    case "medium":
      options.length = 12;
      break;
    case "strong":
      options.length = 16;
      break;
    case "ultra":
      options.length = 24;
      options.symbols = true;
      break;
    default:
      break;
  }
};

if (preset) applyPreset(preset);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const wizardMode = async () => {
  console.log("🎉 Welcome to Safe Password Generator Wizard");
  const question = q => new Promise(res => rl.question(q, ans => res(ans)));

  const len = await question(`Step 1: Password length (${options.length}): `);
  if (len) options.length = parseInt(len, 10);

  const upper = await question(`Include uppercase letters? (Y/n): `);
  if (upper.toLowerCase() === "n") options.uppercase = false;

  const lower = await question(`Include lowercase letters? (Y/n): `);
  if (lower.toLowerCase() === "n") options.lowercase = false;

  const numbers = await question(`Include numbers? (Y/n): `);
  if (numbers.toLowerCase() === "n") options.numbers = false;

  const symbols = await question(`Include symbols? (Y/n): `);
  if (symbols.toLowerCase() === "n") options.symbols = false;

  const readable = await question(`Use readable mode? (Y/n): `);
  if (readable.toLowerCase() === "y") options.readable = true;

  rl.close();
  const pwd = generatePassword(options);
  const info = getPasswordInfo(pwd);
  console.log("🔐 Generated Password:", pwd);
  console.log("ℹ️  Password Info:", info);
};

if (wizard) {
  wizardMode();
} else {
  const pwd = generatePassword(options);
  const info = getPasswordInfo(pwd);
  if (outputJSON) {
    console.log(JSON.stringify(info, null, 2));
  } else {
    console.log("🔐 Generated Password:", pwd);
    console.log("ℹ️  Password Info:", info);
  }
}
