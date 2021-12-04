const express = require("express");

const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogPosts");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").get(getBlogPosts).post(verifyToken, createBlogPost);

router
  .route("/:id")
  .get(getBlogPost)
  .patch(verifyToken, updateBlogPost)
  .delete(verifyToken, deleteBlogPost);

module.exports = router;
