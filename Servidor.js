const express = require('express');
const body_parser= require('body-parser');
var session=require('express-session');

const Ruta_Cliente= require('./routers/clientes');
const Ruta_Producto= require('./routers/productos');

const Ruta_Compras= require('./routers/compras');
const Ruta_Index= require('./routers/index');

var Servidor = express();

Servidor.set('view engine','pug');
Servidor.set('views',__dirname+'/views');

Servidor.use(express.static(__dirname+'/public'));

Servidor.use(body_parser.urlencoded({extended:true}));
Servidor.set(body_parser.json());

//se configura el servidor para crear variables de sesión
Servidor.use(session({
    secret:"mi_texto_secreto",
    resave:true,
    saveUninitialized:true
}));

Servidor.use('/',Ruta_Index);
Servidor.use('/cliente',Ruta_Cliente);
Servidor.use('/producto',Ruta_Producto);
Servidor.use('/compra',Ruta_Compras);

Servidor.listen(4000,()=>{
    console.log("El servidor se esta ejecutando en el puerto 4000");
});
