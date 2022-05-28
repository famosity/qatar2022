const {response}=require('express');
const axios = require('axios');
const Compra = require('../models/Compra');
const User=require('../models/User');
const Paquete=require('../models/Paquete');

let estado=""

const createCompra = async(req,res=response)=>{
    const paqueteId=req.body.paquete
    const userId=req.body.usuario
    const paquete=await Paquete.findById(paqueteId)
    const user=await User.findById(userId)
    const compra=new Compra()
    // paquete.precio<=6000?   compra.estado='Rechazado' :
    // paquete.precio<=7000? compra.estado='Pendiente':compra.estado='Aprobado',
    compra.estado=estado
    // controlCompra(user.cuit,paquete.fecha_inicio,paquete.fecha_fin,paquete.precio).then(function(res){
    //     console.log(res)
    //     if(res.data.aprobada){
    //         compra.estado='Aprobado'
    //     }else{
    //         compra.estado='Rechazado'
    //     }
    // })
    compra.usuario.name=user.name
    compra.usuario.apellido=user.apellido
    compra.usuario.email=user.email
    compra.usuario.telefono=user.telefono
    compra.paquete.seguro=paquete.seguro
    compra.paquete.partido=paquete.partido
    compra.paquete.hotel=paquete.hotel
    compra.paquete.transporte=paquete.transporte
    compra.precio=paquete.precio 
    
    if(paquete.stock>1){
        const paqueteUpdate= paquete.updateOne({   stock:paquete.stock-1});
        const compraSave= compra.save()
        await Promise.all([paqueteUpdate,compraSave]).then(()=>{
            res.json({
                message:'Compra realizada'
            })
        }
        ).catch(err=>{
            console.log(err)
            res.json({
                message:'Error al realizar la compra'
            })
        })
        
        // await compra.save(function(err,suc){
        //     if(err){
        //         console.log(err)
        //     }
        //     console.log(suc)
        //     res.status(201).json({
        //         ok:true,
        //         msg:'se registro la compra con exito',
        //     })
        // })
    }else{
        if(paquete.stock==1){

           await paquete.updateOne({stock:0,estado:'Vendido' },function(err,suc){
                if(err){
                    console.log(err)
                }
                console.log(suc)
                res.status(201).json({
                    ok:true,
                    msg:'se actualizo el stock del paquete',
                })
            })
            // paquete.stock=0
            // paquete.estado='Vendido'
            // await paquete.save(function(err,suc){
            //     if(err){
            //         console.log(err)
            //     }
            //     console.log(suc)
            // })
        }
    }
} 

const controlCompra = async ()=>{
    axios({
        method:'post',
        headers:{   'Content-Type':'application/json',
                    'accept':'application/json'
                },
        url:'http://localhost:8080/operacion',
        data:{
            cuit:20284435215,
            fecha_incio:'2020-01-01',
            fecha_fin:'2020-01-02',
            precio:1000
        }
    }).then(function(res){
        console.log(res.data)
        estado=res.data.aprobada
    }).catch(function(err){
        console.log(err)
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
    getAllCompra,
    controlCompra
}