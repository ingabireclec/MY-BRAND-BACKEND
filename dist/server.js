import mongoose from "mongoose";
import app from "./index.js";
const PORT = process.env.PORT || 3000;
app.listen(`${PORT}`, () => {
  console.log(`Server has started on http://localhost:${PORT} `);
});