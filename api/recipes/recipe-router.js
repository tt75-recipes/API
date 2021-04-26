const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "here are all of the recipes" });
});

router.post("/", (req, res, next) => {
  const { title, source, ingredients, instructions, category } = req.body;

  if (!title || !source || !ingredients || !instructions || !category) {
    next({
      status: 401,
      message: "title, source, ingredients, instructions, category required",
    });
  } else {
    res.status(201).json({ message: "new recipe added" });
  }
});

module.exports = router;
