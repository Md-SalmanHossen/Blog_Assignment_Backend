
import blogApi from "./src/routes/blogApi.js";

import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from 'cors';
import rateLimit from "express-rate-limit";

const app=express();

//security middleware
app.use(cors());
app.use(helmet());
app.use(hpp())
const rateLimiter=rateLimit({
   windowMs:15*60*1000,
   max:1000,
   standardHeaders:true,
   legacyHeaders:false,
})
app.use(rateLimiter);
app.use(cookieParser());

//disable cache
app.set('etag',false);


//body parser with limit
app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({limit:"20mb",extended:true}))


app.use('/api/blogs',blogApi);

//Invalid Route Handling
app.use((req,res,next)=>{
   res.status(404).json({
      message:"Route not found or matched"
   })
})

export default app;