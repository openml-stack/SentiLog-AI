const mongoose=require('mongoose')

const Schema=mongoose.Schema

const user=new Schema({
    firstname: String,
    lastname: String,
    email:{type:String, unique:true},
    password:String,
})

const userModel=mongoose.model("user",user);

module.exports=userModel;