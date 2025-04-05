const express = require('express');
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const requestHandlerRoutes = require("./routes/requestHandlerRoutes");
// Connect to database
connectDB();

// Initialize server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes",noteRoutes);
app.use("/log",requestHandlerRoutes);

app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
})
