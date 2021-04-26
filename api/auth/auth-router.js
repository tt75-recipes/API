const router = require("express").Router();
const User = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "keepthissecret";
const checkUsernameExists = require("../middleware/checkUsernameExists");

const db = require("../data/db-config");

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    next({ status: 401, message: "username and password required" });
  }

  try {
    let user = req.body;
    const hash = bcrypt.hashSync(req.body.password, 8);
    user.password = hash;

    const userCheck = await db("users")
      .where({ username: req.body.username })
      .first();
    if (userCheck) {
      next({ status: 401, message: "username taken" });
    } else {
      const newUser = await User.create(user);
      if (!newUser) {
        next({ status: 401, message: "could not create new user" });
      } else {
        res.status(201).json(newUser);
      }
    }
  } catch (e) {
    next({ message: e.message });
  }
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;

  if (req.user && bcrypt.compareSync(password, req.user.password)) {
    const token = makeToken(req.user);
    res.status(200).json({ message: `welcome, ${username}`, token: token });
  } else {
    next({ status: 401, message: "invalid credentials" });
  }
});

const makeToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = router;
