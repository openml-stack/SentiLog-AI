const mongoose=require("mongoose")
 const ContactSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
      
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true})
 const Contact=mongoose.model("Contact",ContactSchema);
 module.exports=Contact;