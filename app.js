import connection_db from "./database/connectionDb.js";
import bookModel from "./models/bookModel.js";
import express, { request } from 'express';
import bookRouter from "./routers/routes.js";
import cors from 'cors';

export const app = express()


app.use (cors ())
app.use (express.json())
app.get ('/', (req, res) =>{
    res.send('Hola primera API')
});

app.use('/book', bookRouter)

try {
    await connection_db.authenticate();
    console.log('Connection has been established successfully.');

    await bookModel.sync({ force: true });
    console.log('The table for the User model was just (re)created!');
    
        } catch (error) {
    console.error('Unable to connect to the database:', error);
    }

export const server = app.listen(8000, ()=> {
    console.log('Server is working, nice job :) http://localhost:8000')
})
