import express from "express";
import cookieParser from "cookie-parser"
import autRouter from "./routes/user.route.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "http://localhost:5173",
    methods : ["GET" , "POST" ,"PUT" , "DELETE"],
    credentials : true
}
))


app.use("/api/auth",autRouter);


export default app