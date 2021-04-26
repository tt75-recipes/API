const router = require("express").Router();
const Category = require("./category-model");
const restricted = require("../middleware/restricted");

router.get("/", restricted, async (req, res, next) => {
  try {
    const allCategories = await Category.get();
    if (!allCategories) {
      next({ status: 404, message: "could not get all categories" });
    } else {
      res.status(200).json(allCategories);
    }
  } catch (e) {
    next({ message: e.message });
  }
});

router.post("/", restricted, async (req, res, next) => {
  const { category_name } = req.body;

  if (!category_name) {
    next({
      status: 401,
      message: "category_name required",
    });
  } else {
    try {
      const newCategory = await Category.create(req.body);
      if (!newCategory) {
        next({ status: 401, message: "category could not be created" });
      } else {
        res.status(201).json(newCategory);
      }
    } catch (e) {
      next(e.message);
    }
  }
});

module.exports = router;
