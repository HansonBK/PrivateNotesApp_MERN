import mongoose from "mongoose";



const userSchema = new mongoose.Schema(

    {
        username:{
            type: String,
            required: true,
            unique:true,
            minlength: 3, 
            maxlength: 30,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            minlength: 4, 
            maxlength: 100
        },
        email:{

            type:String,
            required: true,
            unique:true,
            minlength: 4, 
            maxlength: 100,
            lowercase:true,
            trim:true
            
        },
        passwordHash:{
            type:String,
            required:true
        }


    },{timestamps:true}
);

userSchema.set("toJSON", {
    transform: (doc,ret)=>{
        delete ret.password;
        return ret;
    },

})

const User = mongoose.model("User", userSchema);
export default User;