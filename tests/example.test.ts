import { test, expect } from "@playwright/test";

test.describe("API workflow tests", () => {
    test("To get all products", async ({ request }) => {
        test.setTimeout(45000);
        const response = await request.get("/api/products");
        const result = await response.json();
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });
});
