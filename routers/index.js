const express= require('express');
const conexion= require('../conexion_bd');

const Ruta_Index= express.Router();

function validar(peticion,respuesta,sigiente){
    if(peticion.session.user_id){
        sigiente();
    }else{
        respuesta.redirect('/validar');
    }
}



Ruta_Index.get('/Validar',(peticion,respuesta)=>{
    respuesta.render('Frm_Validar_Usuario.pug');
});




Ruta_Index.get('/',validar,(peticion,respuesta)=>{
    var sql='select * from producto';
    conexion.query(sql,(error,datos,conf)=>{
        if(!error){
            var user_id= peticion.session.user_id;
            respuesta.render('index',{listado:datos,user:user_id});
        }else{
            respuesta.send('Error al ejecutar la consulta '+error);
        }
    });   
    });

module.exports= Ruta_Index;
