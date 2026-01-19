import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const dbConnection = async() => {

    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log("MONGODB CONNECTED SUCCESSFULLY!!");

    } catch (error) {
        console.log("FAILD CONNECTING TO THE DB !!! ", error);
    } 

};


