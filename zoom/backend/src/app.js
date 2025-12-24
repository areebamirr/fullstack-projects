
import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";

import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoute from "./routes/user.route.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}))
app.use(express.urlencoded({"limit":"40kb", extended:true}))

app.use("/api/v1/users", userRoute);



const start = async () =>{
    const connectionDb = await mongoose.connect("mongodb://localhost:27017/zoom")
    console.log(`MongoDB Connected with ${connectionDb.connection.host + ":" + connectionDb.connection.port}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listing on Port:8080")
    })
}

start();
