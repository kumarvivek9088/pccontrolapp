import express, { response } from "express";
import dbConnect from "./db/dbConnect.js";
import userModel from "./db/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import auth from "./auth.js";
import roomsModel from "./db/roomsModel.js";
import http from 'http';
import cors from 'cors';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
var allowlist = ['http://localhost:3000','http://127.0.0.1:3000','http://192.168.146.4:3000','https://pccontrolapp.vercel.app'];
var corsConfig = function (req,callback){
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1){
        corsOptions = {
            origin : true
        }
    }else{
        corsOptions = {
            origin: false
        }
    }
    callback(null,corsOptions)
}
dbConnect();
app.get('/',auth,(req,res)=>{
    res.status(200).send({
        user:req.user._id,
        email : req.user.email
    })
})
app.get('/test',(req,res)=>{
    res.status(200).send({
        "message":"hello server is up"
    })
})
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin : allowlist,
        methods : ['GET','POST'],
    },
    maxHttpBufferSize : 1e7
});
io.on("connection",(socket)=>{
    console.log('user connected' ,socket.id);
    socket.on('join_room',(data)=>{
        const {username,room} = data;
        // console.log(data.room);
        console.log(data);
        socket.join(room);
        console.log("user connected to room",username,room);
    });
    socket.on('send_message',(data)=>{
        // const {username,room,message} = data;
        console.log(data);
        console.log(data.room);
        io.in(data.room).emit('receive_message',data);  
    });
    socket.on('leave',(room)=>{
        console.log("leaving room",room);
        socket.leave(room);
    });
    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id);
    })

});

app.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password,10)
    .then((hashedpassword)=>{
        const user = new userModel({
            name : req.body.name,
            email : req.body.email,
            password : hashedpassword
        });
        user.save()
        .then((result)=>{
            res.status(200).send({
                result,
                success : true,
                message: "user created successfully"
            })
        })
        .catch((e)=>{
            const userexist  = userModel.findOne({email:req.body.email})
            console.log(userexist);
            if (userexist){
                res.status(400).send({
                    success:false,
                    "message": "User Already exist"
                })
            }
            else{
                res.status(401).send({
                    success:false,
                    message:e
                })
            }
        });
    });
})


app.post('/signin',(req,res)=>{
    userModel.findOne({email:req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password)
        .then((passwordcheck)=>{
            // console.log("im here")
            if (!passwordcheck){
                res.status(400).send({
                    success:false,
                    message:"password is incorrect"
                });
            }
            else{
                const token  = jwt.sign(
                    {
                        userid : user._id,
                        email : user.email,
                        name : user.name
                    },
                    "RANDOM-TOKEN",
                    {expiresIn : "24h"}
                );
                res.status(200).send({
                    success: true,
                    message : "signin successsfull",
                    user : {email:user.email,name:user.name},
                    token : token
                });
            }
        })
        .catch((e)=>{
            res.status(400).send({
                success: false,
                message: e
            });
        });
    })
    .catch((e)=>{
        res.status(400).send({
            success:false,
            message:"email is incorrect"
        });
    });
})


const generateroomId = ()=>{
    return v4();
}

app.post("/createroom",auth,(req,res)=>{
    const roomid =generateroomId();
    console.log(roomid);
    const user  = userModel.findOne({email:req.user.email})
    console.log(req.user.userid);
    const newroom = new roomsModel({
        name:req.body.name,
        user : req.user.userid,
        roomid : roomid

    });
    newroom.save()
    .then((result)=>{
        res.status(200).send({
            result,
            success:true,
            message:"succefully created a new room",
            roomid: roomid
        });
    })
    .catch((e)=>{
        res.status(200).send({
            success:false,
            error:e
        })
    })
})


app.get('/userrooms',auth,cors(corsConfig),(req,res)=>{
    roomsModel.find({user:req.user.userid})
    .then((result)=>{
        res.send({
            result
        })
    })
})

// app.listen(port,()=>{
//     console.log("server started");
// })
server.listen(port,()=>{
    console.log("server is up",port);
})