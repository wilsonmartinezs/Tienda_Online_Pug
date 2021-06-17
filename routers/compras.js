const express = require('express');
const Ruta_Compras = express.Router();
const conexion = require('../conexion_bd');


function validar(peticion,respuesta,sigiente){
    if(peticion.session.user_id){
        sigiente();
    }else{
        respuesta.redirect('/validar');
    }
}


Ruta_Compras.get('/registrar_compra/:id',validar,(peticion,respuesta)=>{
    var id_prod= peticion.params.id;
    var user = peticion.session.user_id[0].cedula;
    var sql=`insert into compra(fecha_comp,cantidad_comp,fk_producto,fk_cliente) 
             values(curdate(),1,${id_prod},${user})`;
        conexion.query(sql,(error,datos,columnas)=>{
            if(!error){
                respuesta.redirect('/');  
            }else{
                respuesta.send('Error al registrar la compra :'+error);
            }
        });
});





Ruta_Compras.get('/Listar_Compras',(peticion,respuesta)=>{
    var cedula = peticion.session.user_id[0].cedula;
    var sql =`select id_compra,nombre_prod,precio_prod,cantidad_comp from compra com
    inner join producto prod on prod.id_producto= com.fk_producto
    where   fk_cliente=${cedula}`;
    conexion.query(sql,(error,datos,columnas)=>{

        if(!error){
            respuesta.render('Frm_Compras_Realizadas',{Lista_compras:datos});
        }else{
            respuesta.send('Error al consultar en la base de datos');

        }
    });

});


Ruta_Compras.get('/Eliminar/:id',(peticion,respuesta)=>{
var id = peticion.params.id;
var sql= `delete from compra where id_compra=${id}`;
conexion.query(sql,(error,datos,columnas)=>{
    if(!error){
        respuesta.redirect('/compra/Listar_Compras');    
    }else{
        respuesta.send('Error al eliminar en la base de datos');
    }
        });
});

module.exports= Ruta_Compras;