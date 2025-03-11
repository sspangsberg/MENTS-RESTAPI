import { test, expect } from "@playwright/test";

export default function productTestCollection() {


    test("Workflow - register, login, create product and verify", async ({ request }) => {

        // 1) Register new user with valid inputs
        const userReg = {
            name: "Lars Larsen",
            email: "mail@larsen.com",
            password: "12345678"
        }

        const userLogin = {
            email: "mail@larsen.com",
            password: "12345678"
        }

        // Register user
        let response = await request.post("/api/user/register", { data: userReg });
        let json = await response.json();

        //console.log("Register:" + json);

        //expect(response.ok()).toBeTruthy();
        //expect(result).toHaveLength(0);
        expect(response.status()).toBe(200);


        // Login user
        response = await request.post("/api/user/login", { data: userLogin });
        json = await response.json();

        const token = json.data.token;
        const userId = json.data.userId;
        expect(response.status()).toBe(200);



        // Create product
        const expectedProduct =
        {
            "name": "Mr. Burns statue",
            "description": "The best and most precious",
            "imageURL": "https://picsum.photos/500/500",
            "price": 100.96,
            "stock": 15,
            "discount": true,
            "discountPct": 25,
            "isHidden": false,
            "_createdBy": userId
        }

        response = await request.post("/api/products/", {
            data: expectedProduct,
            headers: {
                "auth-token": token,
            }
        });

        expect(response.status()).toBe(201);

        /*
        // Verify we have one product in the test repository
        response = await request.get("/api/products/");
        json = await response.json();
        const receivedProduct = json[0];

        console.log(json)
        // verify product data
        expect(receivedProduct.name).toEqual(expectedProduct.name);
        expect(receivedProduct.description).toEqual(expectedProduct.description);

        expect(json).toHaveLength(1);
        */
    });
}