const router = require("express").Router();

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    next({ status: 401, message: "username and password required" });
  } else {
    // TODO
    res.status(201).json({ message: "you have registered a new user" });
  }
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    next({ status: 401, message: "username and password required" });
  } else {
    // TODO
    res.status(201).json({ message: "you have logged in" });
  }
});

module.exports = router;
