//get all blogs swagger documentation
const getoneBlogComments = {
  tags: ["Comments"],
  summary: "get user by path id",
  description: "get single a blog by id",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of the user",
      type: "string",
      example: "hfbjsd2345njndfjhcbe3",
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    404: {
      description: "blog not found",
    },
  },
};
// const getCommentsByBlogId = {
//   tags: ["Comments"],
//   description:
//     "Retrieve a list of all comments associated with the specified blog post. To retrieve comments for a specific blog post, include the blog's ID in the URL as a parameter (e.g. /blogs/{blogId}/comments).",
//   security: [
//     {
//       token: [],
//     },
//   ],
//   parameters: [
//     {
//       name: "blogId",
//       in: "path",
//       description: "ID of the blog post to retrieve comments for",
//       required: true,
//       schema: {
//         type: "string",
//         example: "123", // <-- replace with example blog ID
//       },
//     },
//   ],
//   responses: {
//     200: {
//       description: "OK",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             example: {
//               comments: [
//                 {
//                   _id: "63f38721f14c8e1312f28918",
//                   commentText: "hahahah",
//                   author: "nana gmail.com",
//                   blog_id: "123",
//                 },
//                 // ...
//               ],
//             },
//           },
//         },
//       },
//     },
//   },
// };

//create a blog swagger documentation

const createComment = {
  tags: ["Comments"],
  description: "create a new comment",
  security: [
    {
      token: [],
    },
  ],
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            author: {
              type: "string",
              description: "name of the commentor",
              example: "amanda",
            },
            commentText: {
              type: "string",
              description: "comment on the blog",
              example: "Learning",
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
  "/api/blogs/{id}/comments": {
    post: createComment,
  },
  "/api/blogs/{id}/comments/": {
    get: getoneBlogComments,
  },
};

export default commentRouteDoc;
