import express from "express";
import dotenv from "dotenv";

import userRouter from "../src/routes/userRouter.js";
import { dbConnection } from "./config/db.js";



dotenv.config();


const app = express();
const port = process.env.PORT;
app.use(express.json());




app.use("/api/v1/", userRouter);


dbConnection().then(()=>{

    app.listen(port, ()=>{

        console.log("The app is up and running on port "+ port);
        
    });
})


