const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../controllers/user");

// to check if the user is a valid user
const isValidUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // if user exists
    if (user) {
      // add user data into request
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(403).send({ error: "YOU SHALL NOT PASSSSS!!!!!" });
    }
  } catch (error) {
    res.status(400).send({
      error: "YOU SHALL NOT PASSSSS!!!!!",
    });
  }
};

// to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // if user exists and is an admin
    if (user && user.role === "admin") {
      // add user data into request
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(403).send({ error: "YOU SHALL NOT PASSSSS!!!!!" });
    }
  } catch (error) {
    res.status(400).send({
      error: "YOU SHALL NOT PASSSSS!!!!!",
    });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
};
