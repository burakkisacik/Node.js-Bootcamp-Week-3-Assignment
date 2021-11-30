// @desc        Get All Blog Posts
// @route       GET /api/v1/blogPosts
// @access      Public
exports.getBlogPosts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Show all blog posts",
  });
};

// @desc        Get Single Blog Posts
// @route       GET /api/v1/blogPosts/:id
// @access      Public
exports.getBlogPost = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Show one blog post => ${req.params.id}`,
  });
};

// @desc        Create Blog Post
// @route       POST /api/v1/blogPosts
// @access      Public
exports.createBlogPost = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Create a new blog post",
  });
};

// @desc        Update Blog Post
// @route       PUT /api/v1/blogPosts/:id
// @access      Public
exports.updateBlogPost = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update blog post => ${req.params.id}`,
  });
};

// @desc        Delete Blog Post
// @route       DELETE /api/v1/blogPosts/:id
// @access      Public
exports.deleteBlogPost = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete blog post => ${req.params.id}`,
  });
};
