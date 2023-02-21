const listOfAllBlogs = {
  tags: ["blogs"],
  description: "list of all  blogs",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              _id: "63c5554511120c1b217b1d31",
              title: "eating is good",
              picture: "nothing",
              description: "niceeeeee",
              __v: 0,
            },
          },
        },
      },
    },
  },
};

//get single blog by id swagger documentation
const getoneBlog = {
  tags: ["blogs"],
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
//create a blog swagger documentation

const createBlog = {
  tags: ["blogs"],
  description: "create a new article",
  security: [
    {
      token: [],
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the article",
              example: "Article Title",
            },
            description: {
              type: "string",
              description: "description of the article",
              example: "description",
            },
            category: {
              type: "string",
              description: "category of the article",
              example: "life",
            },
            image: {
              type: "string",
              format: "binary",
              description: "Picture",
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
              status: "success",
              data: [],
            },
          },
        },
      },
    },
  },
};

//update blog swagger documentation
const updateBlog = {
  tags: ["blogs"],
  description: "Update an article",
  security: [
    {
      token: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the article to update",
      required: true,
      type: "string",
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the article",
              example: "Article Title",
            },
            description: {
              type: "string",
              description: "Description of the blog",
              example: "description",
            },
            category: {
              type: "string",
              description: "category of the blog",
              example: "category",
            },
            image: {
              type: "string",
              format: "binary",
              description: "Picture",
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
            properties: {
              _id: {
                type: "string",
                description: "ID of the updated article",
              },
              title: {
                type: "string",
                description: "Title of the updated artcle",
              },

              description: {
                type: "string",
                description: "Description of the updated article",
              },
              category: {
                type: "string",
                description: "category of the updated article",
              },
              image: {
                type: "string",
                description: "Image of the updated article (url)",
              },
            },
          },
        },
      },
    },
  },
};

//delete a blog swagger documentation
const deleteBlog = {
  tags: ["blogs"],
  description: "Delete a blog",
  security: [{ token: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the blog to delete",
      required: true,
      type: "string",
    },
  ],
  responses: {
    204: {
      description: "No Content",
    },
    401: {
      description: "Unauthorized",
    },
    404: {
      description: "Not Found",
    },
  },
};
const likeBlog = {
  tags: ["blogs"],
  description: "Like or a blog post",
  security: [{ token: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the blog post",
      required: true,
      type: "number",
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description:
                  "Message indicating if the blog post was liked or unliked",
              },
              likes: {
                type: "array",
                description: "List of users who have liked the blog post",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
    },
    404: {
      description: "Not Found",
    },
  },
};

const blogRouteDoc = {
  "/api/blogs": {
    post: createBlog,
  },
  "/api/blogs/": {
    get: listOfAllBlogs,
  },
  "/api/blogs/getOne/{id}": {
    get: getoneBlog,
  },

  "/api/blogs/{id}": {
    patch: updateBlog,
  },
  "/api/blogs/delete/{id}": {
    delete: deleteBlog,
  },
  "/api/blogs/{id}/like": {
    post: likeBlog,
  },
};

export default blogRouteDoc;
