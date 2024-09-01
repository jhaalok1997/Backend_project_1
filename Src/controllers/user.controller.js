import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import { user } from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler (async (req, res) => {
    // get details from frontend
    // follow them to route
    // validation with correct format
    // check if user already exists: username,email
    // check the images, check for avatar
    // upload them to cloudinary , avatar



    const {fullName, email , userName , password}= req.body

    if([fullName, email, userName, password].some((field) => field?.trim() === "")){
        throw new ApiError(404,"All fields are required")
    }

    const exitedUser = user.findOne({
        $or: [{userName}, {email}]
    })

    if(exitedUser) {
        throw new ApiError (409,"User with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(404,"avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const User = await user.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase()
    })

    const createdUser =  await User.findById(user._id).select(
       " -password -refreshToken")

        if(!createdUser){
            throw new ApiError(500,"Something went wrong while registering the user .....")
        }

        return res.staus(201).json(
            new ApiResponse(200,createdUser,"user registerd Successfully !!!")
        )

})












export default registerUser;