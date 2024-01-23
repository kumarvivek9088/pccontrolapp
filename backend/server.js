import express, { response } from "express";
import dbConnect from "./db/dbConnect.js";
import userModel from "./db/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import auth from "./auth.js";
import roomsModel from "./db/roomsModel.js";
const app = express();
const port = 3000;
app.use(express.json());
dbConnect();
app.get('/',auth,(req,res)=>{
    res.status(200).send({
        user:req.user._id,
        email : req.user.email
    })
})


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
                res.status(200).send({
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
                res.status(200).send({
                    success:false,
                    password:"password is incorrect"
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
            res.status(401).send({
                success: false,
                message: e
            });
        });
    })
    .catch((e)=>{
        res.status(200).send({
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


app.get('/userrooms',auth,(req,res)=>{
    roomsModel.find({user:req.user.userid})
    .then((result)=>{
        res.send({
            result
        })
    })
})

app.listen(port,()=>{
    console.log("server started");
})