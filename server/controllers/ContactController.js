const  Contact = require("../models/ContactSchema")
const ContactFormHandler=async(req,res)=>{
    try{
         const{username,email,message}=req.body
         if(!username||!email||!message){
            return res.status(400).json({
                success:false,
                message:"all field are required"
            })
         }
     await Contact.create({username,email,message});
     res.status(200).json({
        success:true,
        message:"form submitted successfully"
     })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"server error"
        })

    }
}
module.exports={ContactFormHandler}