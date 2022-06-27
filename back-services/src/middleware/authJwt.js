import jwt from 'jsonwebtoken';
import 'dotenv/config'
import User from '../models/User';
import Role from '../models/Role';
import {verificarJWT} from '../helpers/jwt';

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = await verificarJWT(token)
        req.user = decoded;
        console.log(decoded);
        await User.findById(req.id)
        if (!req.user) {
            return res.status(404).json(
                {
                    message: "User not found" 
                }
            ); 
        }
        next();
    }catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid token" });
    }
}

export const isAdmin = async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id);
        const roles= await Role.find({_id:{$in:user.role}})
        
        for (let i=0; i<roles.length; i++) {
            if (roles[i].name === "ADMIN") {
                next();
                return ;
            }
        }
        return res.status(401).json({ message: "You are not authorized" });
    }catch(error){
        console.log(error);
        return res.status(401).json({ message: "You are not authorized" });

    }
}