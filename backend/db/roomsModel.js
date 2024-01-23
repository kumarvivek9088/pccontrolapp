import mongoose from "mongoose";
const roomsSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true,"room name is required"],
        unique: false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required : [true,""]
    },
    roomid : {
        type : String,
        required : [true, " "],
        unique : [true ," roomid must be unique"]
    }
})

export default mongoose.model("rooms",roomsSchema);

