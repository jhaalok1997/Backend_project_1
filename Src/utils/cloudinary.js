import { v2 } from "cloudinary";
import fs from "fs"


v2.config({ 
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret // Click 'View API Keys' above to copy your API secret
});


const uploadCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // uploading the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has uploaded successfully
        console.log("file  uploaded cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
        console.error("failed to upload the file")
    }
}

export default uploadCloudinary;