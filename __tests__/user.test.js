// user.js
import response from "supertest";
import app from "../index.js";
import mongoose from "mongoose";

describe("user", () => {
  it("should display all users", (done) => {
    response(app).get("/all-users").expect(14).end(done);
  });
});
