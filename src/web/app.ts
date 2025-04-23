import express from "express";
import userRouter from "./routes/users/User.js"
import { error } from "console";

export function startServer(){
      
    const app = express();

   const PORT: number = process.env.PORT? parseInt(process.env.PORT): 4040;
    app.use(express.json());

    
    app.use("/api/", userRouter)

    try{
    app.listen(PORT, ()=>{
        console.log(`Server Running at http://localhost:${PORT}`);
    });
    }
    catch(error){
    console.error(error);
    } 

    
}

