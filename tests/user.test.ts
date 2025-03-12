import { test, expect } from "@playwright/test";

export default function userTestCollection() {

    test("Valid user registration info (Joi)", async ({ request }) => {

        test.setTimeout(10_000);

        // Arrange
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "12345678"
        }

        // Act
        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();

        // Asserts
        expect(response.status()).toBe(200);
        expect(json.error).toEqual(null);
    });


    test("Invalid user registration info (Joi)", async ({ request }) => {

        // AAA pattern:

        // Arrange
        const user = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "1234" //Faulty password - Joi/validation should catch this...
        }

        // Act
        const response = await request.post("/api/user/register", { data: user });
        const json = await response.json();


        // Asserts
        //console.log(json.error); // output actual error message from the API
        expect(response.status()).toBe(400);
        expect(json.error).toEqual("\"password\" length must be at least 6 characters long");
    });
};
