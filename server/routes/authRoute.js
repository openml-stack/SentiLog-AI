require('dotenv').config()
const {Router}=require('express')
const authRouter=Router()
const jwt=require('jsonwebtoken')
const z=require('zod')
const bcrypt=require('bcrypt')
const Jwt_USER_SECRET=process.env.Jwt_USER_SECRET
const userModel=require("../models/user")
const jwtmiddleware = require("../middleware/jwt");

authRouter.post("/signup",async(req,res)=>{
    const hasuppercase = (val) => /[A-Z]/.test(val);
    const haslowercase = (val) => /[a-z]/.test(val);
    const specialcase = (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    const requirebody=z.object({
        email: z.string().email(), 
        password:z.string().min(3).max(8)
        .refine(hasuppercase,{message:"should contain a uppercase"})
        .refine(haslowercase,{message:"should contain a lowercase"})
        .refine(specialcase,{message:"should contain a specialcase"}),

        firstname: z.string().min(1),
        lastname: z.string().min(1)
    })

    const parsedatawithsuccess=requirebody.safeParse(req.body);

    if(!parsedatawithsuccess.success){
        res.status(400).json({
            message:"invalid form of data",
            error:parsedatawithsuccess.error.errors
        })
        return;
    }

    const {email,password,firstname,lastname}=parsedatawithsuccess.data

    const hashedpassword=await bcrypt.hash(password,5)

    try{
        await userModel.create({
            email:email,
            password:hashedpassword,
            firstname:firstname,
            lastname:lastname
        })
        res.json({
            message:"you are signed up"
        })
    }catch(e){
        res.status(500).json({
            message:"signed up fail",
            error:e.message
        })
    }
})

authRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body
try{
    const user=await userModel.findOne({
        email
    })
    if(!user){
        return res.json({
            message:"user not found"
        })
    }
    const matchedpassword=await bcrypt.compare(password,user.password)
    if(matchedpassword){
        const token=jwt.sign({userid: user._id,
            
        }, Jwt_USER_SECRET)
       res.json({
        token
    })
    }
    else{
        return res.json({
            message:"invalid password"
        })
    }
    
}catch(e){
    res.json({
        message:"internal error"
    })
}
})

module.exports = { authRouter };

