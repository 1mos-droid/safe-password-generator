interface PasswordOptions {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  readable?: boolean;
}

interface PasswordInfo {
  password: string;
  length: number;
  entropy: number;
  strength: "very weak" | "weak" | "medium" | "strong" | "very strong";
  includes: {
    upper: boolean;
    lower: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

declare function generatePassword(options?: PasswordOptions): string;
declare function getPasswordInfo(password: string): PasswordInfo;

export { generatePassword, getPasswordInfo };
