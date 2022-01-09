import { configs, CONSTANTS } from "@configs";
import * as JWT from "jsonwebtoken";

const createToken = (payload: object, expiresIn: string, isBearerToken = true) => {
  const token = JWT.sign(payload, configs.auth.JWT_SECRET, { expiresIn });
  return isBearerToken ? `Bearer ${token}` : token;
};

export const loginToken = (data: object) => {
  return createToken(data, CONSTANTS.TOKEN_EXPIRE_TIME.LOGIN);
};
