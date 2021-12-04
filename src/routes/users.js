const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/").get(verifyToken, getUsers).post(verifyToken, createUser);

router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

module.exports = router;
