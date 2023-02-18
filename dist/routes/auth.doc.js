const createUser = {
  tags: ["User"],
  description: "login user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "Username",
              example: "admin"
            },
            email: {
              type: "string",
              description: "User email",
              example: "admin@gmail.com"
            },
            password: {
              type: "string",
              description: "Password",
              example: "1234"
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
              status: 0,
              message: "",
              payload: []
            }
          }
        }
      }
    }
  }
};
// login swagger documentation
const login = {
  tags: ["Login"],
  summary: "Login a user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Email of the user",
              example: "nana@gmail.com"
            },
            password: {
              type: "string",
              description: "Password of the user",
              example: "1234"
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
            properties: {
              token: {
                type: "string",
                description: "JWT token for authentication"
              }
            }
          }
        }
      }
    },
    401: {
      description: "Unauthorized"
    }
  }
};
const userRouteDoc = {
  "/api/signup": {
    post: createUser
  },
  "/api/login": {
    post: login
  }
};
export default userRouteDoc;