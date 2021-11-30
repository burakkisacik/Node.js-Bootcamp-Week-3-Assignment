const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Show all blog posts",
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Show one blog post => ${req.params.id}`,
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Create a new blog post",
  });
});

router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update blog post => ${req.params.id}`,
  });
});

router.delete("/:id", (req, res) => {
  res.send(200).json({
    success: true,
    message: `Delete blog post => ${req.params.id}`,
  });
});

module.exports = router;
