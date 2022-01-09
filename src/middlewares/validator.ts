import { celebrate } from "celebrate";
import multer from "multer";
import { errorRes } from "./error";

const validationOptions = {
  abortEarly: true, // abort after the first validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: { arrays: false, objects: true } // remove unknown keys from objects  but not arrays
};

export const validator = (schema: object) => celebrate(schema, validationOptions);

// File Validator
/**
 *
 * @param {Array} mimetypes | File mimetype which will comes in array
 * @param {String} extension | Extension of the file
 * @param {Number} fileSize | File size
 */
export const fileValidator = (mimetypes: string[], extension: string | null, fileSize: number) =>
  multer({
    limits: { fileSize },
    fileFilter: (_req, file, cb) => {
      try {
        if (mimetypes.includes(file.mimetype)) {
          if (extension) {
            if (file.originalname.endsWith(`.${extension}`)) {
              return cb(null, true);
            }
            throw new Error("Wrong extension");
          }
          return cb(null, true);
        }
        throw new Error("Wrong mimetype");
      } catch (err) {
        cb(null, false);
        if (extension) {
          return cb(errorRes.onlyThisFileTypeAllowed(extension));
        }
        return cb(errorRes.invalidFile());
      }
    }
  });
