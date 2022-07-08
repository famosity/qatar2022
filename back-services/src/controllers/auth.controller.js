import User from "../models/User";
import bcrypt from "bcryptjs"
import {generarJWT} from "../helpers/jwt";
import 'dotenv/config'
import Role from "../models/Role";

export const signUp = async (req, res) => {

    const { username, email, password, role } = req.body;
    
    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });

        if (role){
            const foundRole= await Role.find({name: {$in: role}})
            newUser.role = foundRole.map(role => role._id);
        }else{
            const role = await Role.findOne({name: "USER"});
            newUser.role = [role._id];
        }

        const savedUser=await newUser.save();

        console.log(savedUser);

        const token= await generarJWT(savedUser._id,savedUser.username);

        console.log(token)

        res.status(201).json({ 
            message: "Usuario creado correctamente",
            token: token,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }

}

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({email: email}).populate('role');
        if (!userFound) {
            return res.status(400).json({ message: "El usuario no existe" });
        }
        console.log(userFound);
       const matchPassword = bcrypt.compareSync(password, userFound.password);
        if (!matchPassword) {
            return res.status(401).json(
                { 
                    message: "El password es incorrecto",
                    token: null,
                }
            );
        }
        const token= await generarJWT(userFound._id,userFound.username);
        res.json({ userFound, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}