const express = require('express');

const Ruta_Cliente = express.Router();
const conexion = require('../conexion_bd');

function validar(peticion,respuesta,sigiente){
    if(peticion.session.user_id){
        sigiente();
    }else{
        respuesta.redirect('/validar');
    }
}




Ruta_Cliente.get('/Consultar',validar,(peticion,respuesta)=>{
    var sql ="select * from cliente";
    conexion.query(sql,(err,rows,fields)=>{   
        if(!err){
            respuesta.render('Frm_Consultar_Cliente',{Lista_Clientes:rows});        
        }else{
            console.log('error de ejecucion de la consulta sql '+ err);
        }
    });
});



Ruta_Cliente.get('/registrar',validar,(peticion,respuesta)=>{
    respuesta.render('Frm_Registrar_Cliente');  
});


Ruta_Cliente.post('/Registrar_Cliente',validar,(peticion,respuesta)=>{
    var cedula= peticion.body.cedula;
    var nombre= peticion.body.nombre;
    var direccion= peticion.body.direccion;
    var Telefono= peticion.body.Telefono;
    var sql =`insert into cliente(cedula,nombre,direccion,telefono)
             values(${cedula},'${nombre}','${direccion}','${Telefono}')`;
    conexion.query(sql,(err,rows,fields)=>{   
        if(!err){
            respuesta.redirect('/cliente/Consultar');  
        }else{
            console.log('error al insertar en la tabla cliente '+ err);
        }
    });
});



Ruta_Cliente.get('/Eliminar/:id',validar,(petecion,respuesta)=>{
var id = petecion.params.id;
var sql="delete from cliente where cedula="+id;
    conexion.query(sql,(err,rows,fields)=>{
        if(!err){
            respuesta.redirect('/cliente/Consultar');  
        }
        else{
            respuesta.send("error al eliminar el usuario de bd : "+err);
        }
    });
});


Ruta_Cliente.get('/Buscar/:ced',validar,(peticion, respuesta)=>{
    var cedula= peticion.params.ced;
    var sql="select * from cliente where cedula="+cedula;  
    conexion.query(sql,(err,rows,fields)=>{
        if(!err){
            respuesta.render('Frm_Actualizar_Cliente',{cliente:rows});
        }else{
            respuesta.send("error al buscar el usuario en la bd : "+err);
        }
    }); 
});


Ruta_Cliente.post('/Actualizar_Cliente',(peticion,respuesta)=>{
    
     var sql=`update cliente set nombre='${peticion.body.nombre}',
                                 direccion='${peticion.body.direccion}',
                                 telefono='${peticion.body.Telefono}' 
               where cedula=${peticion.body.cedula}`;

               conexion.query(sql,(err,rows,fields)=>{
                if(!err){
                    respuesta.redirect('/cliente/Consultar');
                }else{
                    respuesta.send("error al actualizar el usuario en la bd : "+err);
                }
        });

    });
   
// Validar usuario en la base de datos
Ruta_Cliente.post('/Validar_Cliente',(peticion, respuesta)=>{
    
    var sql=`select cedula,nombre,rol from cliente where login='${peticion.body.log}' 
              AND password='${peticion.body.pas}'   `;
     conexion.query(sql,(error,dato,columnas)=>{
        if(!error){

            peticion.session.user_id=dato; // se crea la variable sesión en el servidor
            if(peticion.session.user_id.length>0){
                respuesta.redirect('/');
            }else{
                respuesta.render('Frm_Validar_usuario');
            }
        }else{
            respuesta.send('Error al realizar la validación del usuario '+error);
        }
     });
});

Ruta_Cliente.get('/cerrar_sesion',(peticion,respuesta)=>{
    peticion.session.destroy();
    respuesta.redirect('/cliente/Validar_Cliente');

})




module.exports= Ruta_Cliente;
