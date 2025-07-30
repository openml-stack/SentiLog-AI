import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Jwt_USER_SECRET = process.env.Jwt_USER_SECRET;

async function jwtmiddleware(req,res,next){
    try{
        const token=req.headers.token
        if(!token){
            return res.status(401).json({
                message:"token not found"
            })
        }
        const decoded=jwt.verify(token,Jwt_USER_SECRET)
        req.userid=decoded.userid
        next()
    }catch(e){
        res.status(401).json({
            message:"something went wrong"
        })
    }
}

export default jwtmiddleware;