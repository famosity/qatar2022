const {response}=require('express');
const {validationResult}=require('express-validator');
const User = require('../models/User');

const crearUsuario = async(req,res=response)=>{
    console.log("Se guardo",req.body)
    const user=new User(req.body)
    
    await user.save()

    res.status(201).json({
        ok:true,
        msg:'registro',
    })
}

const loginUsuario = (req,res=response)=>{
    
    const{email,password}=req.body;
    

    res.status(201).json({
        ok:true,
        msg:'login',
        email,
        password
    })
}

const revalidadToken = (req,res=response)=>{
    
    res.json({
        ok:true,
        msg:'renew'
    })
}

const getAllUsers = async(req,res=response)=>{
    const users=await User.find()
    res.json({
        users
    })
}


module.exports ={
    crearUsuario
    ,loginUsuario
    ,revalidadToken
    ,getAllUsers
}