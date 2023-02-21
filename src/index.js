import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import BlogRoutes from "./routes/blog.routes.js";
import queryRouter from "./routes/queries.routes.js";
import commentRouter from "./routes/comments.routes.js";
import authenticationRoutes from "./routes/auth.routes.js";
import bodyParser from "body-parser";
import swaggerDoc from "swagger-ui-express";
import swaggerDocumentation from "./utils/documentation.js";
const app = express();
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/documentations", swaggerDoc.serve);
app.use("/documentations", swaggerDoc.setup(swaggerDocumentation));

app.use("/api", queryRouter);
app.use("/api", BlogRoutes);
app.use("/api", authenticationRoutes);
app.use("/api", commentRouter);

app.get("/", (_, res) => {
  return res.status(200).json({
    status: 200,
    success: true,
    message: "Welcome",
  });
});
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
    console.log("the connection is still live");
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
