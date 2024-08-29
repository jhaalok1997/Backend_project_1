import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema ({
    userName:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        lowerCase: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,  // cloudinary url
        required: true,
    },
    coverImages:{
        type: String, // cloudinary url
    },
    watchHistory:[
         {
            type: Schema.Types.ObjectId,
            ref: "videos"
         }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
    }        
},
{timestamps: true}
)

userSchema.pre("save", async function( next ) {
    if(this.isModified("password")) return next ()
        
    this.password = bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password)
{
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        id: this.id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },

    process.env.ACCESS_TOKEN_SECRET,

    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){  jwt.sign({
    id: this.id,
   
},

process.env.REFRESH_TOKEN_EXPIRY,

{
   expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)}

export const user = mongoose.model("user",userSchema)