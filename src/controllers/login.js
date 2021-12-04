const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email } = req.body;

  if (validateEmail(email)) {
    const response = await axios.get(
      `http://localhost:3004/users?email=${email}`
    );
    const user = response.data[0];

    if (user) {
      jwt.sign({ user }, "mySecretKey", (err, token) => {
        res.json({
          token,
        });
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } else {
    res.status(500).json({
      success: true,
      message: "Not a valid email",
    });
  }
};

// function that validates email with regex
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(String(email).toLowerCase());
}
