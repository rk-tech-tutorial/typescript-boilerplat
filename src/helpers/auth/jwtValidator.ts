import { Strategy, ExtractJwt } from "passport-jwt";
import { USER_STRATEGIES, configs } from "@configs";
import userService from "@repository/user";
import { userProjection } from "../../projection/user";

const opts: { jwtFromRequest: any; secretOrKey: any } = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs.auth.JWT_SECRET
};

const userStrategy = (userType: string) =>
  new Strategy(opts, async (jwtPayload, done) => {
    const _id = jwtPayload._id;
    try {
      // checks userType if this is a user specific jwt
      if (userType !== USER_STRATEGIES.USER && jwtPayload.userType !== userType) {
        return done(null, false);
      }

      const filters = _id;
      const projection = userProjection(["basic"]);
      const user = await userService.getById(filters, projection);
      if (!user) {
        return done(null, false);
      }

      return done(null, { _id: user._id, email: user.email, userType: user.userType });
    } catch (err) {
      console.error("UNAUTHORIZED ERROR: ", err);
      return done(err, false);
    }
  });

// Passport Configure
export const passportConfigure = (passportInstance: { use: (arg0: any, arg1: Strategy) => void }) => {
  // user
  Object.keys(USER_STRATEGIES).forEach(userType => {
    passportInstance.use(USER_STRATEGIES[userType], userStrategy(userType));
  });
};
