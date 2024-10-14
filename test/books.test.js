import request from "supertest";
import { app, server } from "../app.js";
import connection_db from "../database/connectionDb.js";

describe("CRUD books", () => {

    // GET ALL BOOKS
    test('should return a response with 200 and type json', async () => {
        const response = await request(app).get("/book");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");
    });

    //GET BOOK BY ID
    // GET BOOK BY ID
    test('should get a book by ID', async () => {
        // Primero, crear un libro para poder obtenerlo por ID
        const bookData = {
            bookTitle: "Fundación",
            authorName: "Isaac Asimov",
            bookSinopsis: "Una historia épica sobre la caída de un imperio galáctico.",
        };
        const createResponse = await request(app).post('/book').send(bookData);
        const bookId = createResponse.body.id;

        // Hacer una petición GET para obtener el libro por ID
        const getResponse = await request(app).get(`/book/${bookId}`);

        // Verificar que la respuesta sea 200 OK
        expect(getResponse.statusCode).toBe(200);

        // Verificar que los datos obtenidos coincidan con los datos del libro creado
        expect(getResponse.body.bookTitle).toBe(bookData.bookTitle);
        expect(getResponse.body.authorName).toBe(bookData.authorName);
        expect(getResponse.body.bookSinopsis).toBe(bookData.bookSinopsis);
        expect(getResponse.body.id).toBe(bookId);  // Verificamos que el ID sea el mismo
    });

    // POST BOOK
    test('should create a book', async () => {
        const bookData = {
            bookTitle: "El señor de los anillos",
            authorName: "J.R.R. Tolkien",
            bookSinopsis: "Una aventura épica en un mundo de fantasía",
        };

        const response = await request(app).post('/book').send(bookData);

        expect(response.statusCode).toBe(201);
        expect(response.body.bookTitle).toBe(bookData.bookTitle);
        expect(response.body.authorName).toBe(bookData.authorName);
        expect(response.body.bookSinopsis).toBe(bookData.bookSinopsis);
        expect(response.body.id).toBeDefined();  // Verifica que se haya creado un ID
    });

    // DELETE BOOK
    test('should delete a book by ID', async () => {
        // Primero, crear un libro para eliminar
        const bookData = {
            bookTitle: "Harry Potter y la piedra filosofal",
            authorName: "J.K. Rowling",
            bookSinopsis: "Un niño descubre que es mago y comienza una nueva vida",
        };

        // Creamos el libro
        const createResponse = await request(app).post('/book').send(bookData);
        const bookId = createResponse.body.id;

        // Ahora, eliminamos el libro recién creado
        const deleteResponse = await request(app).delete(`/book/${bookId}`);

        expect(deleteResponse.statusCode).toBe(200); // o el código que uses para 'delete'
        expect(deleteResponse.body.message).toBe('Libro eliminado correctamente'); // Esto dependerá del mensaje que devuelvas
    });

    // UPDATE BOOK
    test('should update a book by ID', async () => {
        // Primero, crear un libro para actualizar
        const bookData = {
            bookTitle: "El color que cayó del cielo",
            authorName: "H.P Lovecraft",
            bookSinopsis: "Un color extraño cae del cielo",
        };
        const createResponse = await request(app).post('/book').send(bookData);
        const bookId = createResponse.body.id;

        // Ahora, actualizamos el libro recién creado con nuevos datos
        const updateData = {
            bookTitle: "El color que cayó del cielo - Actualizado",
            authorName: "H.P. Lovecraft",
            bookSinopsis: "Una historia extraña de terror cósmico.",
        };

        // Hacer la petición PUT o PATCH para actualizar el libro
        const updateResponse = await request(app).put(`/book/${bookId}`).send(updateData);

        // Verificar que la actualización fue exitosa
        expect(updateResponse.statusCode).toBe(200); // O el código que uses para 'update'

        // Verificar que los datos del libro fueron actualizados correctamente
        expect(updateResponse.body.bookTitle).toBe(updateData.bookTitle);
        expect(updateResponse.body.authorName).toBe(updateData.authorName);
        expect(updateResponse.body.bookSinopsis).toBe(updateData.bookSinopsis);
    });

    // Cerrar el servidor y la base de datos después de las pruebas
    afterAll(async () => {
        server.close();  // Cierra el servidor
        await connection_db.close();  // Cierra la conexión a la base de datos
    });
});
