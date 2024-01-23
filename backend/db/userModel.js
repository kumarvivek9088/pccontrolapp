import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,"please provide your name"],
        unique : false,
    },
    email: {
        type: String,
        required: [true,"please provide an email"],
        unique: [true,"user exist"],
    },
    password: {
        type: String,
        required : [true,"please provide a password"],
        unique: false,
    },
})

export default mongoose.model("users",UserSchema);