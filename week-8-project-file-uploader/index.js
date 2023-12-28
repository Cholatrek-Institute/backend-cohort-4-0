// @ts-nocheck
const express = require("express");
const connectDB = require("./DB/index.js");
const routes = require("./routes/fileUploader.js");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", routes);

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
