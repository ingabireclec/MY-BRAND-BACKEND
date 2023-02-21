const getCommentsByBlogId = {
  tags: ["Comments"],
  description:
    "Retrieve a list of all comments associated with the specified blog post. To retrieve comments for a specific blog post, include the blog's ID in the URL as a parameter (e.g. /blogs/{blogId}/comments).",
  security: [
    {
      token: [],
    },
  ],
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
                  createdAt: "2023-02-20T14:43:45.588Z",
                  updatedAt: "2023-02-20T14:43:45.588Z",
                  __v: 0,
                },
                // add more comments in the same format as above
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
  description: "Create a new comment",
  security: [
    {
      token: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            author: {
              type: "string",
              description: "The name of the commenter",
              example: "John Doe",
            },
            commentText: {
              type: "string",
              description: "The text of the comment",
              example: "Great post!",
            },
            blogId: {
              type: "string",
              description: "The ID of the blog post to add the comment to",
              example: "63ee63bd5ce9577df6cc02c9",
            },
          },
          required: ["author", "commentText", "blogId"],
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "The ID of the new comment",
                example: "63f38721f14c8e1312f28918",
              },
              author: {
                type: "string",
                description: "The name of the commenter",
                example: "John Doe",
              },
              commentText: {
                type: "string",
                description: "The text of the comment",
                example: "Great post!",
              },
              blogId: {
                type: "string",
                description: "The ID of the blog post the comment was added to",
                example: "63ee63bd5ce9577df6cc02c9",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "The timestamp of when the comment was created",
                example: "2023-02-21T10:00:00.000Z",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
                description:
                  "The timestamp of when the comment was last updated",
                example: "2023-02-21T10:00:00.000Z",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "A message explaining why the request was invalid",
                example: "The blog post ID is invalid",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description:
                  "A message explaining why the request was unauthorized",
                example: "You must be logged in to add a comment",
              },
            },
          },
        },
      },
    },
  },
};

const commentRouteDoc = {
  "/api/blogs/{id}/comments": {
    post: createComment,
  },
  "/api/blogs/{id}/comments/": {
    get: getCommentsByBlogId,
  },
};

export default commentRouteDoc;
