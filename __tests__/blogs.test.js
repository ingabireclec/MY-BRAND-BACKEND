import request from "supertest";
import app from "../src/index.js";
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

describe("Blogs API", () => {
  let createdBlogId;

  test("should create a new blog with image", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .field("title", "My Blog")
      .field("description", "This is a blog")
      .field("category", "Technology")
      .attach("image", "__tests__/testFiles/test-image.jpeg")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("My Blog");
    createdBlogId = res.body._id;
  }, 15000);

  test("should get all blogs", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.status).toBe(200);
  });

  test("should return 404 for a non-existent blog", async () => {
    const res = await request(app).get("/api/blogs/999");
    expect(res.status).toBe(404);
  });

  test("should get a blog by id", async () => {
    const res = await request(app).get(`/api/blogs/${createdBlogId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdBlogId);
  });

  test("should return 404 for a non-existent blog", async () => {
    const res = await request(app)
      .patch("/api/blogs/999")
      .send({ title: "My New Blog Title" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  }, 15000);

  test("should update a blog", async () => {
    const res = await request(app)
      .patch(`/api/blogs/${createdBlogId}`)
      .send({ title: "My New Blog Title" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("My New Blog Title");
  }, 15000);

  test("should return 404 for a non-existent blog", async () => {
    const res = await request(app)
      .delete("/api/blogs/999")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  }, 15000);

  test("should delete a blog", async () => {
    const res = await request(app)
      .delete(`/api/blogs/${createdBlogId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ message: "Blog deleted successfully" })
    );
  }, 15000);

  test("should toggle like a blog", async () => {
    // const res1 = await request(app)
    //   .post("/api/blogs/63e0d83f043088bd763b502b/like")
    //   .set("Authorization", `Bearer ${token}`);
    // expect(res1.text).toEqual("You liked the blog");

    const res2 = await request(app)
      .post("/api/blogs/63ee63d85ce9577df6cc02cd/like")
      .set("Authorization", `Bearer ${token}`);
    expect(res2.status).toBe(400);
    expect(res2.text).toEqual("You've already liked this blog");
  }, 15000);
});
