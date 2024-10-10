import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const connection_db = new Sequelize(
    process.env.DB_DATABASE,   // Nombre de la base de datos
    process.env.DB_USERNAME,   // Nombre de usuario
    process.env.DB_PASSWORD,   // Contraseña
    {
        host: process.env.DB_HOST,     // Host de la base de datos
        dialect: process.env.DB_DIALECT, // Dialecto (mysql, postgres, etc.)
        define: {
            timestamps: false,  // Desactivar timestamps globalmente
        }
    }
);

export default connection_db;


