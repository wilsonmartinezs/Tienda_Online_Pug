const mysql=require("mysql");

var conexion=mysql.createConnection({
    host : "localhost",
    user : "root",
    password:"juanjose1201",
    database:"bd_tienda"
    });

    conexion.connect((err)=>{
        if(!err){
            console.log('Conectado al motor de base de datos de MySql');
          
        }
        else{
            console.log('No se conecto al motor de base de datos de MySql :'+err);
        }
    });    

module.exports=conexion;