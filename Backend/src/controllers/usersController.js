const {
  createUserAsync,
  getAllUsersAsync,
  getUserByIdAsync,
  getUserByEmailAsync,
} = require("../services/usersService");
const logger = require("../utils/logger");

const createUser = async (req, res) => {
  try {
    const { userName, emailId, password } = req.body;
    const user = await createUserAsync(userName, emailId, password);
    logger.info(`New user created: ${JSON.stringify(user)}`);
    res.status(201).json(user);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersAsync();
    logger.info(`All users retrieved: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdAsync(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`User retrieved: ${JSON.stringify(user)}`);
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const user = await getUserByEmailAsync(emailId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(`User retrieved: ${JSON.stringify(user)}`);
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    logger.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await getUserByEmailAsync(emailId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    logger.info(`User logged in : ${user.userName} `);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error While Login: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  loginUser,
};
