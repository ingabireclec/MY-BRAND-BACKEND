import request from "supertest";
import app from "../index.js";

describe("Blogs API", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTY0OTI2Mzk5ZjVhYTc0MTIwZWNkMyIsImlzQWRtaW4iOnRydWUsImVtYWlsIjoibmFuYUBnbWFpbC5jb20iLCJpYXQiOjE2NzYzODIyMjYsImV4cCI6MTY3NjQ2ODYyNn0.GIwXP4tq0sKZGrFYf6Czk5BSEerOoywTb_zGA4JvLR8";

  it("should create a new blog with image", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .field("title", "My Blog")
      .field("description", "This is a blog")
      .field("category", "Technology")
      .attach("image", "__tests__/testFiles/test-image.jpeg")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("My Blog");
  });

  it("should get all blogs", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.status).toBe(200);
  });
  it("should return 404 for a non-existent blog", async () => {
    const res = await request(app).get("/api/blogs/999");
    expect(res.status).toBe(404);
  });

  it("should get a blog by id", async () => {
    const res = await request(app).get("/api/blogs/63e0d975af3e9c15404b2352");
    expect(res.status).toBe(200);
    expect(res.body._id).toBe("63e0d975af3e9c15404b2352");
  });

  it("should return 404 for a non-existent blog", async () => {
    const res = await request(app)
      .patch("/api/blogs/999")
      .send({ title: "My New Blog Title" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
  it("should update a blog", async () => {
    const res = await request(app)
      .patch("/api/blogs/63e0d975af3e9c15404b2352")
      .send({ title: "My New Blog Title" })
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("My New Blog Title");
  });

  it("should return 404 for a non-existent blog", async () => {
    const res = await request(app)
      .delete("/api/blogs/999")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(500);
  });

  it("should delete a blog", async () => {
    const res = await request(app)
      .delete("/api/blogs/63eba45d64e16988d51ad2a1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it("should toggle like a blog", async () => {
    const res = await request(app)
      .post("/api/blogs/63eba494cf7cb7f91ae9c63c/like")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.text).toBe("You liked the blog");
  });
});
