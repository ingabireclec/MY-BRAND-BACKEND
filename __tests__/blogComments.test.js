import request from "supertest";
import app from "../src/index.js";
import blogModel from "../src/models/Blogs.model.js";
import Comment from "../src/models/comments.model.js";

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
describe("comments API", () => {
  test("It should create a new comment for the specified blog post", async () => {
    //const blog = await blogModel.findOne();
    const blogId = "63ee63d85ce9577df6cc02cd";
    const requestBody = {
      author: "unknown",
      commentText: "hahaha",
      blogId: blogId,
    };

    const response = await request(app)
      .post(`/api/blogs/${blogId}/comments`)
      .send(requestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.comment).toBeDefined();
    expect(response.body.comment.author).toBe(requestBody.author);
    expect(response.body.comment.commentText).toBe(requestBody.commentText);
  }, 30000);

  test("should retrieve all comments for the specified blog post", async () => {
    // const blogId = "63eb9983ac213031641743f2";
    //atlas server id
    const blogId = "63ee63d85ce9577df6cc02cd";
    const response = await request(app)
      .get(`/api/blogs/${blogId}/comments/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  }, 15000);
});
