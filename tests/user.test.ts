import { test, expect } from "@playwright/test";

export default function userTestCollection() {
    /*
    test("Valid user registration info (Joi)", async ({ request }) => {

        // 1) Register new user with valid inputs
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "12345678"
        }

        const response = await request.post("/api/user/register", { data: user });

        // Asserts
        expect(response.status()).toBe(200);
    });
    */

    test("Invalid user registration info (Joi)", async ({ request }) => {

        // 1) Register new user with invalid inputs
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "1234" //Faulty password - Joi/validation should catch this...
        }

        const response = await request.post("/api/user/register", { data: user });

        // Asserts
        expect(response.status()).toBe(400);
        //expect(response.body).toBe.a('object');
        //   expect(res.body.error).to.be.equal("\"password\" length must be at least 6 characters long");  
    });
};
