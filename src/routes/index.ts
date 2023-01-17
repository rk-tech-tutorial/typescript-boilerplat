import { Router } from "express";
import { userRouter } from "./user";

const router = Router();

// Auth
router.use("/user", userRouter);

export { router };
