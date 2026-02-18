import mongoose, { Types } from "mongoose";


const userSchema  = mongoose.Schema( {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
          
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
            lowercase: true,
        
        },
        avatar: {
            type: String,
        },
        // password: {
        //     type: String,
        //     // required: [true, "password is required"],
        // }
    },
    {
        timestamps: true,
    })


const User = mongoose.model("User", userSchema)

export default User;