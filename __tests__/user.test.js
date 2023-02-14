// user.js
import response from "supertest";
import request from "supertest";

import app from "../index.js";
import mongoose from "mongoose";

describe("user", () => {
  let token = "";
  it("should login admin or user", (done) => {
    request(app)
      .post("/api/login")
      .send({
        email: "nana@gmail.com",
        password: "1234",
      })
      .end(() => {
        done();
      });
  });
  test("should create users", (done) => {
    response(app)
      .post("/signup")
      .send({
        username: "ngabire",
        email: "ingabire@gmail.com",
        password: "12345",
      })
      .end(done);
  });
});

describe("GET /all-users", () => {
  test("It should return all users with a 200 status code", async () => {
    const token = "";

    const response = await request(app)
      .get("/all-users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("It should return a 401 status code if user is not logged in", async () => {
    const response = await request(app).get("/all-users");

    expect(response.statusCode).toBe(404);
  });

  test("It should return 403 status code if user is not an admin", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI4NzYyNzFmZDRhOWM0OGI2MDU3NyIsImlzQWRtaW4iOmZhbHNlLCJlbWFpbCI6ImZpZmlAZ21haWwuY29tIiwiaWF0IjoxNjc2Mzg2MDE1LCJleHAiOjE2NzY0NzI0MTV9.ZojLcvZ16LZsVDZnlcRz3J80PwnFCGkugJU-U7zmX7s";
    const response = await request(app)
      .get("/all-users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });
});
