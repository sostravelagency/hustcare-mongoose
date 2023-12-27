import express from 'express';
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'
import connectDB from './src/config/connect'
import verifyToken, { verifyTokenSocket } from './src/middleware/verifyToken';
const twilio = require('twilio')
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(cors())
// {
//     origin: process.env.CLIENT_URL,
//     methods: ["POST","GET","PUT","DELETE"]
// }
app.use(express.json())
app.use(express.urlencoded({extended:true}))
initRoutes(app)
connectDB()
io.on("connection", socket=> {
    console.log(socket.id)
    socket.on("user", (data)=> {
        console.log("data", data)
        if(data?.token?.length > 0) {
            const id= verifyTokenSocket(data.token)
            socket.emit("userId", id.id)
        }
    })
    socket.on("push_booking", data=> {
        io.emit("receive_booking", data)
    })
})

const port = process.env.PORT || 8888


const listener =  server.listen(port, () => {
    console.log(`ervers is running on the port ${listener.address().port}`);
})