const express = require('express');
const cors = require('cors'); // 👉 Import CORS
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const requestHandlerRoutes = require("./routes/requestHandlerRoutes");
const userRoutes = require("./routes/userRoutes");

// Connect to database
connectDB();

// Initialize server
const app = express();

// Enable CORS (Allow all origins)
app.use(cors({ origin: 'http://localhost:8080' })); // Or restrict: app.use(cors({ origin: 'http://localhost:8080' }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/notes", noteRoutes);
app.use("/log", requestHandlerRoutes);
app.use("/users", userRoutes);

// Start server
app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
});
