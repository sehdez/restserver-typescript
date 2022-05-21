import cors from 'cors'
import express, { Application } from 'express'
import userRoutes from '../routes/usuarios';

import db from '../db/connection';

class Server {
    private app : Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '3000';

        
        this.bdConnection();
        this.middlewares();
        // Definir Rutas
        this.routes()
        
    }

    
    async bdConnection(){
        try {
            await db.authenticate();
            console.log('Base de datos online')
        } catch (error) {
            
        }
    }


    middlewares() {
        
        // cors
        this.app.use( cors() )

        // Servir carpeta Pública
        this.app.use( express.static('public') );


        // Lectura del body
        this.app.use( express.json() );
    }


    listen(){
        this.app.listen( this.port, ()=> {
            console.log( 'Servidor corriendo en el puerto ' + this.port );
        })
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }
}

export default Server;

