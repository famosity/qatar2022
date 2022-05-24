const {response}=require('express');
const Compra = require('../models/Compra');
const User=require('../models/User');
const Paquete=require('../models/Paquete');

const createCompra = async(req,res=response)=>{
    const paqueteId=req.body.paquete
    const userId=req.body.usuario
    const paquete=await Paquete.findById(paqueteId)
    const user=await User.findById(userId)
    const compra=new Compra()
    paquete.precio<=6000?   compra.estado='Rechazado' :
    paquete.precio<=7000? compra.estado='Pendiente':compra.estado='Aprobado',
    compra.paquete=paquete,
    compra.usuario=user
    await compra.save(function(err,suc){
        if(err){
            console.log(err)
        }
        console.log(suc)
        res.status(201).json({
            ok:true,
            msg:'se registro la compra con exito',
        })
    })
    
} 

const getAllCompra = async(req,res=response)=>{
    const compra=await Compra.find()
    res.json({
        compra
    })

}



module.exports ={
    createCompra,
    getAllCompra
}