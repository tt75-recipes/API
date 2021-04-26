const router = require("express").Router();
const Recipe = require("./recipe-model");

router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.get();
    if (!allRecipes) {
      next({ status: 404, message: "could not get all recipes" });
    } else {
      res.status(200).json(allRecipes);
    }
  } catch (e) {
    next({ message: e.message });
  }
});

router.post("/", async (req, res, next) => {
  const { title, source, ingredients, instructions, category } = req.body;

  if (!title || !source || !ingredients || !instructions || !category) {
    next({
      status: 401,
      message: "title, source, ingredients, instructions, category required",
    });
  } else {
    try {
      const newRecipe = await Recipe.create(req.body);
      if (!newRecipe) {
        next({ status: 401, message: "recipe could not be created" });
      } else {
        res.status(201).json(newRecipe);
      }
    } catch (e) {
      next(e.message);
    }
  }
});

module.exports = router;
