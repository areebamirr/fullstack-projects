
import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";

import cors from "cors";
import connectToSocket from "./controllers/socketManager";

const app = express();
const server = createServer();
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));

app.get("/home", (req,res)=>{
    return res.json({"hello": "World"})
});

const start = async () =>{
    const connectionDb = await mongoose.connect("mongodb://localhost:27017/")
    console.log(`MongoDB Connected with ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listing on Port:8000")
    })
}

start();
