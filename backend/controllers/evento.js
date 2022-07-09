const {response}=require('express');
const Evento = require('../models/Evento');

const crearEvento = async(req,res=response)=>{
    console.log("Se guardo",req.body)
    const evento=new Evento(req.body)
    
    await evento.save(function(err,suc){
        if(err){
            console.log(err)
        }
        res.status(201).json({
            ok:true,
            msg:'registro Evento creado',
            id:suc._id
        })
    })
}

const actualizarEvento = async(req,res=response)=>{
    const eventoId=req.params.eventoId
    const evento=req.body
    await Evento.findByIdAndUpdate(eventoId,{$set:evento},{new:true})
    res.json({
        msg:'registro actualizado'
    })
}

const getEventoById = async(req,res=response)=>{
    const eventoId=req.params.eventoId
    const evento=await Evento.findById(eventoId) //usar en paquete con los diferentes idS
    res.json({
        evento
    })
}

const getAllEvento = async(req,res=response)=>{
    const eventos=await Evento.find()
    res.json({
        eventos
    })
}

module.exports ={
    crearEvento,
    actualizarEvento,
    getEventoById,
    getAllEvento
}