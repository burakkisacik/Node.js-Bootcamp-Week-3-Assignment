const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const { method, url } = req;
  const logData = {
    method,
    url,
  };
  console.log("buraya baaak : ", method, url);

  fs.appendFile(
    path.join(__dirname, "../Analytics", "log.txt"),
    `${JSON.stringify(logData)}\n*******************\n`,
    (err) => {
      if (err) {
        fs.appendFile(
          path.join(__dirname, "../Analytics", "errors.txt"),
          `${err.message}\n*******************\n`,
          (error) => {
            console.log(error.message);
          }
        );
        console.log(err.message);
      }
      console.log(
        "Request has been logged. Please look into /Analytics/log.txt".magenta
          .underline
      );
    }
  );
  next();
};

module.exports = logger;
