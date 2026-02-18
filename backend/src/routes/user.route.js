import {Router } from "express";
import { getAllUsers , signupUser, loginUser, getUserProfile, logoutUser, deleteUser } from "../controlles/user.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();    


userRouter.get("/all", getAllUsers);

userRouter.post("/signup", signupUser);

userRouter.post("/login", loginUser);

userRouter.post("/profile", getUserProfile);

userRouter.post("/logout", logoutUser);

userRouter.delete("/delete", deleteUser);

export default userRouter;