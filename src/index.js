const express = require("express");
const colors = require("colors"); // eslint-disable-line

// Routes
const blogPosts = require("./routes/blogPosts");

const app = express();

// Mount routes
app.use("/api/v1/blogPosts", blogPosts);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold);
});
