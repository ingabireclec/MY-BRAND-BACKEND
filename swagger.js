// import express from "express";
// import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";

// const app = express();
// const port = 5000;

// // Define the Swagger options object
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My App API",
//       description:
//         "An API for managing blogs, comments, messages, and authentication",
//       version: "1.0.0",
//     },
//   },
//   apis: [
//     "./routes/blog.routes.js",
//     "./routes/comments.routes.js",
//     "./routes/messages.routes.js",
//     "./routes/auth.routes.js",
//   ],
// };

// // Generate the Swagger specification
// const swaggerSpec = swaggerJsdoc(options);

// // Set up the Swagger UI page
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Set up the routes for your API
// app.use("/api", queryRouter);
// app.use("/api", BlogRoutes);
// app.use("/api", authenticationRoutes);
// app.use("/api", commentRouter);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
