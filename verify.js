const jwt = require("jsonwebtoken");

const token = "PASTE_YOUR_TOKEN_HERE";

const secret = "my_super_secret_key";

try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
} catch (err) {
    console.log("Invalid token");
}