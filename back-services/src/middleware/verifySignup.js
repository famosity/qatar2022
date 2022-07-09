import {ROLE} from '../models/Role';
import User from '../models/User';
export const  checkRolesExisted = (req, res, next) => {
    
    const {role} = req.body;
    if(role) {
        if (!ROLE.includes(role[0])) {
            return res.status(400).json({
                message: `Role ${role} no existe`
            })
        }
    }
    next();
}

export const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    try{
        const user = await User.findOne({username:req.body.username});
        if(user) {
            return res.status(400).json({
                message: `Username already exists`
            })
        }
        const email = await User.findOne({email:req.body.email});
        if(email) {
            return res.status(400).json({
                message: `Email already exists`
            })
        }
        next();
    }catch(error){
        console.log(error);
    }
}