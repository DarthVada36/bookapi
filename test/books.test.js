import request from "supertest";
import {app, server} from "../app.js";

describe("crud books", () => {
    test('should return a response with 200 and type json', async () => {
        const response = await request(app).get("/book");
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain("application/json");
    });
    afterAll(async () => {
        // Cierra el servidor aquí
        server.close(); // Usa server.close() para cerrar el servidor
    });
});


