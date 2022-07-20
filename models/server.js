const express = require('express');

const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{

    constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users'

    //Conectar a base de datos
    this.conectarDB();

    //Midlewears: Fucnion que siempre se va a ejecutar cuando levantemos el servidor
    this.middlewears();

    //Rutas de mi app
    this.routes();
    this.listen();
    }

    async conectarDB (){
        await dbConection();
    }

    middlewears() {
        //CORS
        this.app.use(cors());//Se usa para proteccion

        //Lectura y parseo del body
        this.app.use (express.json());//Cualquier info que venga de un post put o delete la serializa a json

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;