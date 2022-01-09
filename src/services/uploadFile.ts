import * as fs from "fs";

export const saveFile = (buffer: Buffer, fileName: string) => {
  fs.writeFileSync(fileName, buffer);

  return { url: fileName };
};
