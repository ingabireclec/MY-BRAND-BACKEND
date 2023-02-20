//get all blogs swagger documentation
const getCommentsByBlogId = {
  tags: ["Comments"],
  description:
    "Retrieve a list of all comments associated with the specified blog post. To retrieve comments for a specific blog post, include the blog's ID in the URL as a parameter (e.g. /blogs/{blogId}/comments).",
  parameters: [
    {
      name: "blogId",
      in: "path",
      description: "ID of the blog post to retrieve comments for",
      required: true,
      schema: {
        type: "string",
        example: "123", // <-- replace with example blog ID
      },
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              comments: [
                {
                  _id: "63f38721f14c8e1312f28918",
                  commentText: "hahahah",
                  author: "nana gmail.com",
                  blog_id: "123",
                },
                // ...
              ],
            },
          },
        },
      },
    },
  },
};

//create a blog swagger documentation

const createComment = {
  tags: ["Comments"],
  description: "create a new comment",
  security: [
    {
      auth_token: [],
    },
  ],
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            commentText: {
              type: "string",
              description: "comment on the blog",
              example: "Learning",
            },
            author: {
              type: "string",
              description: "name of the commentor",
              example: "amanda",
            },
            blogId: {
              type: "string",
              description: " the blog id ",
              example: "63ee63bd5ce9577df6cc02c9",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              _id: "63ce9d45789d0954691ba0b6",
              comment: "helloooooo",
              __v: 0,
            },
          },
        },
      },
    },
  },
};

const commentRouteDoc = {
  "/api/blogs/:id/comments": {
    post: createComment,
  },
  "/api/blogs/:id/comments/": {
    get: getCommentsByBlogId,
  },
};

export default commentRouteDoc;
