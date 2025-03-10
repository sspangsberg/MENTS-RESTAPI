import { test, expect } from "@playwright/test";

export default function productTestCollection() {

    
    test("To get all products", async ({ request }) => {

        const response = await request.get("/api/products");
        const result = await response.json();

        

        expect(response.ok()).toBeTruthy();
        expect(result).toHaveLength(0);
        expect(response.status()).toBe(200);
    });
}