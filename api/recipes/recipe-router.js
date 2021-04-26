const router = require("express").Router();
const Recipe = require("./recipe-model");
const restricted = require("../middleware/restricted");
const db = require("../data/db-config");

router.get("/", restricted, async (req, res, next) => {
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

router.post("/", restricted, async (req, res, next) => {
  const { title, source, ingredients, instructions, category } = req.body;

  if (!title || !source || !ingredients || !instructions || !category) {
    next({
      status: 401,
      message: "title, source, ingredients, instructions, category required",
    });
  } else {
    try {
      const category_id = await db("categories")
        .where("category_name", category)
        .select("category_id")
        .first();

      const recipe = {
        title: title,
        source: source,
        ingredients: ingredients,
        instructions: instructions,
        category_id: category_id.category_id,
        // user_id: req.decodedToken.subject || 1,
        user_id: 1,
      };
      const newRecipe = await Recipe.create(recipe);
      if (!newRecipe) {
        next({ status: 401, message: "recipe could not be created" });
      } else {
        res.status(201).json(newRecipe);
      }
    } catch (e) {
      next({ message: e.message });
    }
  }
});

module.exports = router;
