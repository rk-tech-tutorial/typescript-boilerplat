import { CONSTANTS, ENUMS, ENUMS_ARRAY } from "@configs";
import { Joi } from "celebrate";

export const userSchema = {
  create: Joi.object().keys({
    userType: Joi.string()
      .valid(...ENUMS_ARRAY.USERS.userType)
      .required(),
    name: Joi.string().max(CONSTANTS.USER.MAX_FIRST_NAME_LEN).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(CONSTANTS.USER.MIN_PASSWORD_LEN).required()
  }),

  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};
