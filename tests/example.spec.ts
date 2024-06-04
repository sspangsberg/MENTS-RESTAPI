import { test, expect } from "@playwright/test";

test.describe("API workflow tests", () => {
  test("To get all the booking details", async ({ request }) => {
    const response = await request.get("/api/products");
    const result = await response.json();
    expect(result).toHaveLength(4);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
