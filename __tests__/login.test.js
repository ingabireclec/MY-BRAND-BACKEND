import request from "supertest";
import app from "../index";
it("should login admin ", (done) => {
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
      const token = res.body.token;
      expect(res.status).toBe(200);
      expect(token).toBeDefined();
      done();
    });
});
