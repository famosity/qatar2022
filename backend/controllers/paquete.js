const {response}=require('express');
const Paquete = require('../models/Paquete');

const createPaquete = async(req,res=response)=>{
    console.log("Se guardo",req.body)
    
    const paquete=new Paquete(req.body)
    paquete.partido.cant_partidos=paquete.partido.name.length
    await paquete.save(function(err,suc){
        if(err){
            console.log(err)
        }
        res.status(201).json({
            ok:true,
            msg:'se registro el paquete',
            id:suc._id
        })
    })
}

const updatePaquete = async(req,res=response)=>{
    const paqueteId=req.params.paqueteId
    const paquete=req.body
    await Paquete.findByIdAndUpdate(paqueteId,{$set:paquete},{new:true})
    res.json({
        msg:'estadia actualizada'
    })
}

const getPaqueteById = async(req,res=response)=>{
    console.log(req)
    const paqueteId=req.params.paqueteId
    const paquete=await Paquete.findById(paqueteId)
     //usar en paquete con los diferentes idS
    console.log(paquete)
    res.json({
        paquete
    })
}


const getAllPaquete = async(req,res=response)=>{
    const paquete=await Paquete.find()
    res.json({
        paquete
    })
}

const detelePaquete = (req,res=response)=>{
    const paqueteId=req.params.paqueteId
    Paquete.findByIdAndDelete(paqueteId,function(err,suc){ //analizar
        if(err){
            console.log(err)
        }
        res.json({
            msg:'Hasta la vista baby'
        })
    }) //analizar
}

module.exports ={
    createPaquete,
    updatePaquete,
    getPaqueteById,
    getAllPaquete,
    detelePaquete
}