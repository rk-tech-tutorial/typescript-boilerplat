import { v4 as uuid } from "uuid";

export const assignmentUrlGenerator = (title: string, mimetype: string) => {
  const extension = mimetype.split("/")[1];
  return `upload/${title}-${uuid()}.${extension}`;
};

export const solutionUrlGenerator = (mimetype: string) => {
  const extension = mimetype.split("/")[1];
  return `upload/${uuid()}.${extension}`;
};
