
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { afterAll, afterEach, beforeAll, describe, test, expect } from "vitest";

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());


import { app } from "../src/server.ts";

describe("MENTS-API", async () => {
  test("Can do health check", async () => {
    //server.use(
    http.get("/api/welcome");
    expect(response.ok).true;
  });
});

/*
import request from "supertest";
import app from "../src/app";

describe("API endpoint /colors", () => {
  // GET - List all colors
  it("should return all colors", async () => {
    const res = await request(app)
      .get("/api/products")
      .expect("Content-Type", /json/);
    expect(res.status).toEqual(200);
    //expect(res.body.results).toEqual(["RED", "GREEN", "BLUE"]);
  });


  
  // GET - Invalid path
  it("should return Not Found", async () => {
    const res = await request(app).get("/INVALID_PATH");
    expect(res.status).toEqual(404);
  });

  // POST - Add new color
  it("should add new color", async () => {
    const res = await request(app)
      .post("/colors")
      .send({
        color: "YELLOW",
      })
      .expect("Content-Type", /json/);
    expect(res.status).toEqual(201);
    expect(res.body.results).toContain("YELLOW");
  });

  // POST - Bad Request
  it("should return Bad Request", async () => {
    const res = await request(app).post("/colors").type("form").send({
      color: "YELLOW",
    });
    expect(res.status).toEqual(400);
  });
  */
});