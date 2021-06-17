const express = require('express');

const ruta_producto = express.Router();
const conexion = require('../conexion_bd');


ruta_producto.get('/consultar',(peticion,respuesta)=>{

    var sql ="select * from producto";
    conexion.query(sql,(err,rows,fields)=>{   
        if(!err){
            respuesta.render('Frm_Consultar_Producto',{Lista_Productos:rows});
            
        }else{
            console.log('error de ejecucion de la consulta sql '+ err);
        }
    });
});


module.exports= ruta_producto;