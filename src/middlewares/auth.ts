import passport from "passport";
import { USER_STRATEGIES } from "@configs";

// Auth Middleware
export const userAuth = passport.authenticate(USER_STRATEGIES.USER, { session: false });
export const studentAuth = passport.authenticate(USER_STRATEGIES.STUDENT, { session: false });
export const instructorAuth = passport.authenticate(USER_STRATEGIES.INSTRUCTOR, { session: false });
