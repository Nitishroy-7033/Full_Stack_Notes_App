const basicAuth = require("basic-auth");
const User = require("../models/user");
const logger = require("../utils/logger");

const authHandler = async (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    res.set("WWW-Authenticate", 'Basic realm="User Area"');
    logger.error("Authentication failed: Missing credentials");
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const user = await User.findOne({ emailId: credentials.name });
    if (!user || user.password !== credentials.pass) {
      logger.error("Authentication failed: Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.user = user;
    next();
  } catch (err) {
    logger.error("Error during authentication:", err);
    console.error("Error during authentication:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authHandler;
