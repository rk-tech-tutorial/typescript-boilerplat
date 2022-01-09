import { Request, Response, NextFunction } from "express";
import { isCelebrate as isCelebrateError } from "celebrate";
import { errorRes } from "@middlewares/error";

export const errorHandler = (_err: any, req: Request, res: Response, next: NextFunction) => {
  // isBoom if true, indicates this is a Boom object instance. It will be used if error is an instance of Error.
  let err = _err;
  if (!err.isBoom && !isCelebrateError(err)) {
    console.log(err);
  }
  if (!err.isBoom) {
    if (isCelebrateError(err) || err.name === "ValidationError") {
      console.log(err);
      err = errorRes.wrongData();
      if (_err.joi && _err.joi.details && _err.joi.details.length && _err.joi.details[0].message) {
        err.output.payload["original"] = _err.joi.details[0].message;
      } else if (_err.message) {
        err.output.payload["original"] = _err.message;
      }
    } else if (err.name && err.code && err.name === "MongoError" && err.code === 11000) {
      err = errorRes.dataExists();
    } else if (/jwt expired/.test(err)) {
      err = errorRes.invalidToken();
    } else {
      err = errorRes.systemError();
    }
    // TODO: Implement MongoDB Error Handling for connection and db
  }
  console.error(err.output);
  return res.status(err.output.statusCode).json({ error: err.output.payload });
};
