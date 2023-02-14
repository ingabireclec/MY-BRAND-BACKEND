import mongoose from "mongoose";
import app from "./index.js";

const PORT = process.env.PORT || 5000;

app.listen(`${PORT}`, () => {
  console.log(`Server has started on http://localhost:${PORT} `);
});
// mongoose.set("strictQuery", false);
// mongoose
//   .connect("mongodb://localhost:27017/andeladb", {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("Database Connected");
//     console.log("the connection is still live");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// export default app;
