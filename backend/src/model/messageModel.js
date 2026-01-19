import mongoose from "mongoose";


const {Schema} = mongoose;
const messageSchema = mongoose.Schema({


    owner:{

        type: Schema.Types.ObjectId,
        ref:"User",
        required:true

    },

    title:{

        type:String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim:true


    },
    messagebody:{

        type:String,
        required: true,
        minlength: 4,
        maxlength: 1000,
        trim:true
    }


}, 
    {timestamps: true}

);


const Message = mongoose.model("Message", messageSchema);

export default Message;