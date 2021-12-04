const axios = require("axios");
const jwt = require("jsonwebtoken");

// @desc        Get All Blog Posts
// @route       GET /api/v1/blogPosts
// @access      Public
exports.getBlogPosts = async (req, res, next) => {
  const response = await axios("http://localhost:3004/blogPosts");

  const allBlogPosts = response.data;

  res.status(200).json({
    success: true,
    message: allBlogPosts,
  });
};

// @desc        Get Single Blog Posts
// @route       GET /api/v1/blogPosts/:id
// @access      Public
exports.getBlogPost = async (req, res, next) => {
  const blogPostId = req.params.id;

  const response = await axios.get(
    `http://localhost:3004/blogPosts/${blogPostId}`
  );

  const blogPost = response.data;

  res.status(200).json({
    success: true,
    message: blogPost,
  });
};

// @desc        Create Blog Post
// @route       POST /api/v1/blogPosts
// @access      Private
exports.createBlogPost = async (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const blogPost = {
        id: Math.floor(Math.random() * 1000),
        userId: data.user.id,
        title: req.body.title,
        body: req.body.body,
      };
      try {
        await axios.post("http://localhost:3004/blogPosts", blogPost);
      } catch (error) {
        console.log(err);
        res.sendStatus(500);
      }

      res.status(200).json({
        success: true,
        message: "Blog post created",
        authData: data,
      });
    }
  });
};

// @desc        Update Blog Post
// @route       PATCH /api/v1/blogPosts/:id
// @access      Private
exports.updateBlogPost = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const blogPostID = req.params.id;
      const updatedFields = req.body;

      try {
        const blogPost = await axios.get(
          `http://localhost:3004/blogPosts/${blogPostID}`
        );

        if (blogPost.data.userId !== data.user.id) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to update this blog post",
          });
          return;
        }

        await axios.patch(
          `http://localhost:3004/blogPosts/${blogPostID}`,
          updatedFields
        );
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Error updating blog post. Invalid ID",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `Update blog post => ${req.params.id}`,
        authData: data,
      });
    }
  });
};

// @desc        Delete Blog Post
// @route       DELETE /api/v1/blogPosts/:id
// @access      Private
exports.deleteBlogPost = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const blogPostID = req.params.id;
      try {
        const blogPost = await axios.get(
          `http://localhost:3004/blogPosts/${blogPostID}`
        );
        if (blogPost.data.userId !== data.user.id) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to delete this blog post",
          });
          return;
        }
        await axios.delete(`http://localhost:3004/blogPosts/${blogPostID}`);
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Error deleting blog post. Invalid ID",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `Deleted blog post => ${req.params.id}`,
        authData: data,
      });
    }
  });
};
