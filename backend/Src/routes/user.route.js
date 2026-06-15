import { Router } from "express";
import { getMe, Login, register } from "../controller/user.controller.js";
import identifyUser from "../middlewares/auth.middleware.js"
import {RegisterValidation , LoginValidation} from "../validation/user.validation.js"
import validate from "../middlewares/validatiom.middleware.js";

const autRouter = Router();


autRouter.post("/register",validate(RegisterValidation),register);
autRouter.post("/login",validate(LoginValidation),Login);
autRouter.get("/getme",identifyUser,getMe);


export default autRouter