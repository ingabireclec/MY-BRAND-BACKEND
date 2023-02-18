import request from "supertest";
import app from "../src/index.js";
let token;
test("should login admin ", (done) => {
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
      expect(res.status).toBe(200);
      done();
    });
}, 30000);
