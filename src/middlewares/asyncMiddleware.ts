import { Request, Response, NextFunction } from "express";

export const asyncMiddleware = (func: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(func(req, res, next)).catch(err => next(err));
};
