import express from "express";
import userRouter from "./routes/users/User.js"

export function startServer(){
      
    const app = express();

    const port = 3000;
    
    app.use(express.json());

    
    app.use("/api/", userRouter)


    app.listen(port, ()=>{
        console.log(`Server Running at http://localhost:${port}`);
    });
    
}

