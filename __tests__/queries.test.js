import request from "supertest";
import app from "../index.js";
import queryModel from "../src/models/queries.model";
describe("Queries endpoints", () => {
  //   let token = "";
  test("should login admin", (done) => {
    request(app)
      .post("/api/login")
      .send({
        email: "nana@gmail.com",
        password: "1234",
      })
      .end(() => {
        done();
      });
    // expect(res.statusCode).toEqual(200);
    // token = res.body.payload.accessToken;
  });
  // test("should get messages", async () => {
  //   let token = "";
  //   const adminToken = `${token} admin`;

  //   const response = await request(app)
  //     .get("/api/messages")
  //     .set("Authorization", `Bearer ${adminToken}`);
  //   expect(response.statusCode).toEqual(200);
  // });
  // test("should not create a message", async () => {
  //   const res = await request(app).post("/api/messages").send({
  //     name: "naija ama",
  //     email: "naija@example.com",
  //   });
  //   expect(res.statusCode).toEqual(404);
  // });

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
