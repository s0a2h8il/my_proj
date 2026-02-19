const jwt = require("jsonwebtoken");

// Paste generated token here
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3NzEzOTkxNTYsImV4cCI6MTc3MTQwMjc1Nn0.S8zkeESOz9DS0UrAFPiwyFWwpr53cxfU7y0slQ2qMyc";

const secret = "my_super_secret_key";

try {
    const decoded = jwt.verify(token, secret);
    console.log("Token is valid");
    console.log(decoded);
} catch (err) {
    console.log("Invalid token");
    console.log(err.message);
}
