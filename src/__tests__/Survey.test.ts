import request from "supertest";
import app from "../app";

import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection =  await createConnection();
        await connection.runMigrations();
        
    });

    it("Should be able to create a new survey", async () => {
        const response =  await request(app).post("/surveys").send({
            title: "user@example.com",
            description: "userExample",
        });
        
        expect(response.status).toBe(201);
        expect(response.status).toHaveProperty("id");
    });
    

});