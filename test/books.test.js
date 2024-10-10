import request from "supertest";
import {app, server} from "../app.js";
import connection_db from "../database/connectionDb.js";

describe("crud books", () => {

    //GET ALL BOOKS
    test('should return a response with 200 and type json', async () => {
        const response = await request(app).get("/book");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");
    });

    test('should return a response with 201 and type json', async () => {
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


    });

    afterAll(async () => {
        server.close();// Cierra el servidor aquí
        connection_db.close(); // Usa server.close() para cerrar el servidor
    });
});


