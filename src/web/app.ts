import express from "express";
import userRouter from "./routes/users/user.route.js"
import {errorHandler } from "./middleware/error.js";

export function startServer(){
    const app = express();

   const PORT: number = process.env.PORT? parseInt(process.env.PORT): 4040;
    app.use(express.json());
    
    app.use("/api/", userRouter);

   
    app.use(errorHandler);
    try{
    app.listen(PORT, ()=>{
        console.log(`Server Running at http://localhost:${PORT}`);
    });
    }
    catch(error){
    console.error(error);
    } 

    
}

