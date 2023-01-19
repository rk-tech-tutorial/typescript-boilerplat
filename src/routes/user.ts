import UserController from "@controllers/userAuth/authController";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth, studentAuth, userAuth } from "@middlewares/auth";
import { validator } from "@middlewares/validator";
import { userSchema } from "@validators";
import { Router } from "express";
import { ENUMS } from "../models/enums";

const router = Router();

const userController = new UserController();
// Auth
router.post("/signup", validator({ body: userSchema.create }), asyncMiddleware(userController.post));
router.post("/login", validator({ body: userSchema.login }), asyncMiddleware(userController.login));

// Get User list
router.get("/students", userAuth, asyncMiddleware(userController.getAllUsers(ENUMS.USERS.userType.STUDENT)));

export { router as userRouter };
