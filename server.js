// import mongoose from "mongoose";
// import app from "./index.js";
// import swaggerDocs from "./swagger.js";

// const PORT = process.env.PORT || 5000;

// app.listen(`${PORT}`, () => {
//   console.log(`Server has started on http://localhost:${PORT} `);
//   swaggerDocs(app, port);
// });
import app from "./index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT} `);
  // swaggerDocs(app, PORT);
});
