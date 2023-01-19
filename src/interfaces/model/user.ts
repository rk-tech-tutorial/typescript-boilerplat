import { mongoose } from "@configs";

export interface UserI {
  userType: String;
  name: String;
  email: String;
  password?: String;
  subjects?: String[];
}

export default interface UserSI extends UserI, mongoose.Document {
  validatePassword(password: any): false;
}
