const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
   
})

const uploadFile=async (LocalFilePath)=>{

const options={
    resource_type:"image",
    use_filename:true,
    unique_filename:true, 
    overwrite:false  
}
    try {
        const result=await cloudinary.uploader.upload(LocalFilePath,options) 
        if(result){
            console.log("file uploaded sucessfully");
            fs.unlinkSync(LocalFilePath)
            return result
        }
    } catch (error) {
        console.log("Error while uploading in cloudinary");
        fs.unlinkSync(LocalFilePath) 
    }
}
module.exports = uploadFile;