import mongoose from "mongoose";
import app from "../src/index";
const PORT = process.env.PORT || 5000;
app.listen(`${PORT}`, () => {
  console.log(`Server has started on http://localhost:${PORT} `);
});