// import request from "supertest";
// import app from "../index";
// import userModel from "../src/models/users.model";
// import jwt from "jsonwebtoken";

// describe("Protected API", () => {
//   it("should return a 401 error if user is not logged in", async () => {
//     const response = await request(app).get("/api/all-users");
//     expect(response.statusCode).toBe(401);
//   });

//   it("should return a 403 error if user is not an admin", async () => {
//     const user = await userModel.findOne({ email: "user@example.com" });
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET
//     );

//     const response = await request(app)
//       .get("/api/all-users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(403);
//   });

//   it("should allow access if user is an admin", async () => {
//     const admin = await User.findOne({ email: "nana@gmail.com" });
//     const token = jwt.sign(
//       { id: admin.id, email: admin.email, isAdmin: true },
//       process.env.JWT_SECRET
//     );

//     const response = await request(app)
//       .get("/api/all-users")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//   });
// });
