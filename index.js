import express from "express";
import mongoose from "mongoose";
import BlogRoutes from "./src/routes/blog.routes.js";
import queryRouter from "./src/routes/queries.routes.js";
import commentRouter from "./src/routes/comments.routes.js";
import authenticationRoutes from "./src/routes/auth.routes.js";
import bodyParser from "body-parser";

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(express.urlencoded({ extended: false }));

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
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/andeladb", {
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
