import request from "supertest";
import app from "../index.js";
import {
  createNewUserService,
  findOneUserService,
} from "../src/services/auth.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
let token;

beforeAll((done) => {
  request(app)
    .post("/api/login")
    .send({
      email: "nana@gmail.com",
      password: "1234",
    })
    .end((err, res) => {
      if (err) {
        done(err);
      }
      token = res.body.token;
      done();
    });
});

describe("user", () => {
  test("should create users", (done) => {
    request(app)
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
    const response = await request(app)
      .get("/api/all-users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  }, 15000);

  test("It should return a 401 status code if user is not logged in", async () => {
    const response = await request(app).get("/all-users");

    expect(response.statusCode).toBe(404);
  });

  test("It should return 403 status code if user is not an admin", async () => {
    const response = await request(app)
      .get("/all-users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  test("It should return a 401 status code if user is not logged in", async () => {
    const response = await request(app).get("/api/all-users");

    expect(response.statusCode).toBe(401);
  });
});
