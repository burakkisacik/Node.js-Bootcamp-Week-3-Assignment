const express = require("express");
const colors = require("colors"); // eslint-disable-line
const jwt = require("jsonwebtoken");
const logger = require("./middlewares/logger");

// Routes
const login = require("./routes/login");
const users = require("./routes/users");
const blogPosts = require("./routes/blogPosts");

const app = express();

// Body parser
app.use(express.json());

// logger
app.use(logger);

// Mount routes
app.use("/api/v1/login", login);
app.use("/api/v1/blogPosts", blogPosts);
app.use("/api/v1/Users/", users);
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold);
});
