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

router.get("/:id", restricted, async (req, res, next) => {
  try {
    const recipe = await Recipe.getById(req.params.id);
    if (!recipe) {
      next({
        status: 404,
        message: `could not get recipe with id ${req.params.id}`,
      });
    } else {
      res.status(200).json(recipe);
    }
  } catch (e) {
    next({ message: e.message });
  }
});

router.post("/", restricted, async (req, res, next) => {
  const { title, source, ingredients, instructions, category } = req.body;
  const user_id = req.decodedToken.subject;

  if (!title || !source || !ingredients || !instructions || !category) {
    next({
      status: 401,
      message: "title, source, ingredients, instructions, category required",
    });
  } else {
    try {
      let [category_id] = await db("categories")
        .where("category_name", category)
        .select("category_id");

      // console.log(category_id);

      if (!category_id || category_id === undefined) {
        [category_id] = await db("categories")
          .insert({ category_name: category })
          .returning("category_id");
      }

      const recipe = {
        title: title,
        source: source,
        instructions: instructions,
        category_id: category_id,
        user_id: user_id,
      };
      const newRecipe = await Recipe.create(recipe);
      if (!newRecipe) {
        next({ status: 401, message: "recipe could not be created" });
      } else {
        for (let i = 0; i < ingredients.length; i++) {
          const [ingredient] = await db("ingredients").where({
            ingredient_name: ingredients[i].name,
            measurement: ingredients[i].measurement,
          });
          if (!ingredient) {
            const [ingredient_id] = await db("ingredients")
              .insert({
                ingredient_name: ingredients[i].name,
                measurement: ingredients[i].measurement,
              })
              .returning("ingredient_id");
            await db("recipe_ingredients").insert({
              recipe_id: newRecipe.recipe_id,
              ingredient_id: ingredient_id,
            });
          }
        }
        res.status(201).json(newRecipe);
      }
    } catch (e) {
      next({ message: e.message });
    }
  }
});

module.exports = router;
