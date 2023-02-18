import request from "supertest";
import app from "../src/index.js";
import queryModel from "../src/models/queries.model";

let token = "";
beforeAll((done) => {
  request(app)
    .post("/api/login")
    .send({
      email: "nana@gmail.com",
      password: "1234",
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      token = res.body.token;
      console.log(token);
      done();
    });
});
describe("Queries endpoints", () => {
  test("should get messages", async () => {
    const response = await request(app)
      .get("/api/messages")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(200);
  }, 15000);
  test("should create a new message", async () => {
    const newQuery = {
      name: "naija ama",
      email: "naija@example.com",
      message: "Test message",
    };
    const response = await request(app).post("/api/messages").send(newQuery);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(newQuery);
    const savedQuery = await queryModel.findOne(newQuery);
    expect(savedQuery).toMatchObject(newQuery);
  });
});
