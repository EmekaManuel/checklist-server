import express from "express";
import { createUser, loginUser } from "../controllers/user-controller";

const userRoute = express.Router();

userRoute.route("/create").post(createUser);
userRoute.route("/login").post(loginUser);

export default userRoute;
