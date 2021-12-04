const axios = require("axios");
const jwt = require("jsonwebtoken");

// @desc        Get All Users
// @route       GET /api/v1/users
// @access      Private
exports.getUsers = async (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const response = await axios.get("http://localhost:3004/users");
        const users = response.data;
        res.status(200).json({
          success: true,
          message: users,
          authData,
        });
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
  });
};

// @desc        Get Single User
// @route       GET /api/v1/users/:id
// @access      Private
exports.getUser = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const userID = req.params.id;
        const response = await axios.get(
          `http://localhost:3004/users/${userID}`
        );
        const user = response.data;
        res.status(200).json({
          success: true,
          message: user,
        });
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
  });
};

// @desc        Create User
// @route       POST /api/v1/users
// @access      Private
exports.createUser = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const user = {
        id: Math.floor(Math.random() * 1000),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
      };

      try {
        await axios.post("http://localhost:3004/users", user);
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
      res.status(200).json({
        success: true,
        message: `User created`,
        authData,
      });
    }
  });
};

// @desc        Update User
// @route       PUT /api/v1/users/:id
// @access      Private
exports.updateUser = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userID = req.params.id;
      const updatedFields = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
      };

      try {
        const response = await axios.get(
          `http://localhost:3004/users/${userID}`
        );

        console.log("here : ", response.data.id);

        if (response.data.id !== authData.user.id) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to update this user",
          });
          return;
        }

        console.log("here");

        await axios.put(`http://localhost:3004/users/${userID}`, updatedFields);

        res.status(200).json({
          success: true,
          message: `Update user => ${req.params.id}`,
          authData,
        });
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error here",
        });
      }
    }
  });
};

// @desc        Delete User
// @route       DELETE /api/v1/user/:id
// @access      Private
exports.deleteUser = (req, res, next) => {
  jwt.verify(req.token, "mySecretKey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const userID = req.params.id;
      try {
        const response = await axios.get(
          `http://localhost:3004/users/${userID}`
        );

        const user = response.data;

        if (user.id !== authData.user.id) {
          res.status(403).json({
            success: false,
            message: "You are not authorized to delete this user",
          });
          return;
        }

        await axios.delete(`http://localhost:3004/users/${userID}`);

        res.status(200).json({
          success: true,
          message: `Delete user => ${req.params.id}`,
          authData,
        });
      } catch (error) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
  });
};
