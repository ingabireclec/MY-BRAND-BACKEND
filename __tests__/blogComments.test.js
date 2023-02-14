import request from "supertest";
import app from "../index";

//  test case for createComment function
describe("comments routes", () => {
  it("should return a 404 error if the specified blog post does not exist", async () => {
    const response = await request(app)
      .post("/blogs/nonexistent-blog-id/comments")
      .send({ author: "John Doe", commentText: "Test comment" });

    expect(response.statusCode).toBe(404);
  });
  test("It should create a new comment for the specified blog post", async () => {
    const blogId = "63eba494cf7cb7f91ae9c63c";
    const requestBody = {
      commentText: "hahaha",
      author: "unknown",
      blogid: "63eba494cf7cb7f91ae9c63c",
    };

    const response = await request(app)
      .post(`/blogs/${blogId}/comments`)
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.comment.author).toBe(requestBody.author);
    expect(response.body.comment.commentText).toBe(requestBody.commentText);
  });

  // test case for getCommentsByBlogId function
});
it("should return a 404 error if the specified blog post does not exist", async () => {
  const response = await request(app).get(
    "/blogs/nonexistent-blog-id/comments"
  );
  expect(response.statusCode).toBe(404);
});
// test("It should retrieve all comments for the specified blog post", async () => {
//   const blogId = "63ea3670ec70e33dcddbe46a";
//   const expectedComments = [
//     { author: "John Doe", commentText: "This is a test comment." },
//     { author: "unknown", commentText: "haha" },
//   ];

//   const response = await request(app).get(`/blogs/${blogId}/comments`);
//   console.log(response);
//   expect(response.statusCode).toBe(200);
//   expect(response.body.comments.length).toBe(expectedComments.length);
//   expect(response.body.comments[0].author).toBe(expectedComments[0].author);
//   expect(response.body.comments[0].message).toBe(expectedComments[0].message);
//   expect(response.body.comments[1].author).toBe(expectedComments[1].author);
//   expect(response.body.comments[1].message).toBe(expectedComments[1].message);
// });
//});
