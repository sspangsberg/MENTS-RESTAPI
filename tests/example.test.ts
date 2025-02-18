import { test, expect } from "@playwright/test";

test.describe("API workflow tests", () => {
    test("To get all products", async ({ request }) => {
        
        const response = await request.get("/api/products");
        const result = await response.json();

        console.log(result);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });
});
