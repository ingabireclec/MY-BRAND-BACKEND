//get all blogs swagger documentation
const listOfAllComments = {
  tags: ["Comments"],
  description: "list of all comments",
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
              __v: 0
            }
          }
        }
      }
    }
  }
};
//create a blog swagger documentation

const createComment = {
  tags: ["Comments"],
  description: "create a new comment",
  security: [{
    auth_token: []
  }],
  requestBody: {
    content: {
      "Application/json": {
        schema: {
          type: "object",
          properties: {
            commentText: {
              type: "string",
              description: "comment on the blog",
              example: "Learning"
            },
            Author: {
              type: "string",
              description: "name of the commentor",
              example: "amanda"
            }
          }
        }
      }
    }
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
              __v: 0
            }
          }
        }
      }
    }
  }
};
const commentRouteDoc = {
  "/api/blogs/:id/comments": {
    post: createComment
  },
  "/api/blogs/:id/comments/": {
    get: listOfAllComments
  }
};
export default commentRouteDoc;