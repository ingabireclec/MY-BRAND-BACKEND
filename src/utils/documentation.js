import blogRouteDoc from "../routes/blogs.doc.js";
import messageRouteDoc from "../routes/queries.doc.js";
import commentRouteDoc from "../routes/comments.doc.js";
import userRouteDoc from "../routes/auth.doc.js";
const swaggerDocumentations = {
  openapi: "3.0.0",
  info: {
    title: "My brand Api",
    Version: "0.1.0",
    description: "This is the backend of my BRAND",
  },
  servers: [
    {
      url: "https://clec-brandapi.onrender.com",
      name: "production server",
    },
    {
      url: "http://localhost:3000",
      name: "development server",
    },
  ],
  tags: [
    {
      name: "blogs",
      description: "",
    },

    {
      name: "Messages",
      description: "",
    },

    {
      name: "User",
      description: "",
    },
    {
      name: "Comments",
      description: "",
    },
  ],
  schemes: ["HTTP", "HTTPS"],
  components: {
    securitySchemes: {
      token: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  paths: {
    ...blogRouteDoc,
    ...messageRouteDoc,
    ...commentRouteDoc,
    ...userRouteDoc,
  },
};

export default swaggerDocumentations;
