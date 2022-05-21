const {response}=require('express');
const Estadia = require('../models/Estadia');

const createEstadia = async(req,res=response)=>{
    console.log("Se guardo",req.body)
    
    const estadia=new Estadia(req.body)
    
    await estadia.save(function(err,suc){
        if(err){
            console.log(err)
        }
        res.status(201).json({
            ok:true,
            msg:'se registro la Estadia',
            id:suc._id
        })
    })
}

const updateEstadia = async(req,res=response)=>{
    const estadiaId=req.params.estadiaId
    const estadia=req.body
    await Estadia.findByIdAndUpdate(estadiaId,{$set:estadia},{new:true})
    res.json({
        msg:'estadia actualizada'
    })
}

const getEstadiaById = async(req,res=response)=>{
    console.log(req)
    const estadiaId=req.params.estadiaId
    const estadia=await Estadia.findById(estadiaId)
     //usar en paquete con los diferentes idS
    console.log(estadia)
    res.json({
        estadia
    })
}


const getAllEstadia = async(req,res=response)=>{
    const estadia=await Estadia.find()
    res.json({
        estadia
    })
}

const deteleEstadia = (req,res=response)=>{
    const estadiaId=req.params.estadiaId
    Estadia.findByIdAndDelete(estadiaId) //analizar
    res.json.status(200)({
        msg:'estadia eliminada'
    })
}

module.exports ={
    createEstadia,
    updateEstadia,
    getEstadiaById,
    getAllEstadia,
    deteleEstadia
}