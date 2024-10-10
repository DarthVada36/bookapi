import connection_db from "../database/connectionDb.js"
import { DataTypes } from "sequelize";

const bookModel = connection_db.define(
    'Book',
    {
        // Model attributes are defined here
        bookTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        authorName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        bookSinopsis: {
        type: DataTypes.STRING,
        allowNull: false
        },
    },{
        tableName: 'books', // Asegúrate de que el nombre de la tabla es correcto
        timestamps: false, // Esto es opcional, según tu modelo
    });

export default bookModel;