# 🛡️ Safe Password Generator

**Next-level secure password generator** for Node.js — CLI and programmatic API. Generate strong, random, and customizable passwords safely for any project.

---

## 🚀 Features

- Generate **cryptographically secure passwords**  
- CLI wizard for interactive password creation  
- Programmatic API for easy integration  
- Customize password length, complexity, and character sets  
- Optional exclusion of similar characters (e.g., `I`, `l`, `1`)  
- Safe for use in scripts, apps, or automation  

---

## 📦 Installation

```bash
# NPM
npm install @1mos-droid/safe-password-generator

# Yarn
yarn add @1mos-droid/safe-password-generator
```

---

## 🧩 Basic Usage (Programmatic)

```js
const { generatePassword } = require('@1mos-droid/safe-password-generator');

// Generate a 16-character password
const password = generatePassword({ length: 16 });
console.log(password);

// Customize with options
const strongPassword = generatePassword({
  length: 24,
  numbers: true,
  symbols: true,
  lowercase: true,
  uppercase: true,
  excludeSimilar: true
});
console.log(strongPassword);
```

---

## 🧙 CLI Wizard

```bash
npx safe-password-generator --wizard
```

Example interactive session:

```
🧙 Safe Password Generator Wizard
Enter desired password length: 16
Include numbers? (Y/n): Y
Include symbols? (Y/n): Y
Exclude similar characters (e.g., I, l, 1)? (Y/n): Y
✅ Generated password: B8$kQ3vR#x2M7wLp
```

---

## ⚙️ CLI Quick Commands

```bash
# Generate a password of length 12
npx safe-password-generator --length 12

# Generate a password with symbols and numbers
npx safe-password-generator --length 20 --symbols --numbers
```

---

## 🔐 Options

| Option              | Description                                         | Default |
|--------------------|-----------------------------------------------------|---------|
| `length`           | Password length                                     | 16      |
| `numbers`          | Include numbers                                     | true    |
| `symbols`          | Include symbols                                     | true    |
| `lowercase`        | Include lowercase letters                           | true    |
| `uppercase`        | Include uppercase letters                           | true    |
| `excludeSimilar`   | Exclude similar characters like `I`, `l`, `1`       | false   |

---

## 🧠 Programmatic API

```js
const { generatePassword } = require('@1mos-droid/safe-password-generator');

const customPassword = generatePassword({
  length: 20,
  numbers: true,
  symbols: false,
  uppercase: true,
  lowercase: true,
  excludeSimilar: true
});

console.log(customPassword);
```

---

## 📄 Example `package.json` entry

```json
{
  "name": "@1mos-droid/safe-password-generator",
  "version": "2.0.0",
  "description": "Next-level secure password generator with CLI and programmatic API",
  "main": "index.js",
  "bin": {
    "safe-password-generator": "./cli.js"
  },
  "keywords": ["password", "generator", "cli", "security", "crypto", "random"],
  "author": "Moses M. Kumesi",
  "license": "MIT",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

---

## 🧰 Next Steps

- ✅ Test locally with `npm link`  
- 🚀 Publish to GitHub Packages  
- 💬 Share with the community
