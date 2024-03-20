import bcrypt from "bcrypt";

export const PasswordHashing = async (password: string): Promise<string> => {
  try {
    const result = await bcrypt.hash(password, 10);
    return result;
  } catch (error: any) {
    throw new Error("Error occurred while hashing password: " + error.message);
  }
};

export const PasswordCompare = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
  } catch (error: any) {
    throw new Error(
      "Error occurred while comparing password: " + error.message
    );
  }
};
