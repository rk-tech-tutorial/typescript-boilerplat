import bcrypt from "bcrypt";
import { CONSTANTS } from "../configs/constants";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(CONSTANTS.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error("BCRYPT: ", err);
    throw err;
  }
};

export const validatePassword = bcrypt.compareSync;
