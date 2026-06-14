import { Router } from "express";
import { getMe, Login, register } from "../controller/user.controller.js";
import identifyUser from "../middlewares/auth.middleware.js"

const autRouter = Router();


autRouter.post("/register",register);
autRouter.post("/login",Login);
autRouter.get("/getme",identifyUser,getMe);


export default autRouter