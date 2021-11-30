const express = require("express");

const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogPosts");

const router = express.Router();

router.route("/").get(getBlogPosts).post(createBlogPost);

router
  .route("/:id")
  .get(getBlogPost)
  .put(updateBlogPost)
  .delete(deleteBlogPost);

module.exports = router;
