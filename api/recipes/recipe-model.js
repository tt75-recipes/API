const db = require("../data/db-config");

const get = () => {
  return db("recipes");
};

const getById = async (id) => {
  const unformatted = await db("recipes as r")
    .join("recipe_ingredients as ri", "ri.recipe_id", "r.recipe_id")
    .join("ingredients as i", "i.ingredient_id", "ri.ingredient_id")
    .join("categories as c", "r.category_id", "c.category_id")
    .join("users as u", "u.user_id", "r.user_id")
    .where("r.recipe_id", id);

  let ingredients = [];

  for (let i = 0; i < unformatted.length; i++) {
    ingredients.push({
      name: unformatted[i].ingredient_name,
      measurement: unformatted[i].measurement,
    });
  }

  return {
    recipe_id: unformatted[0].recipe_id,
    title: unformatted[0].title,
    source: unformatted[0].source,
    instructions: unformatted[0].instructions,
    category: unformatted[0].category_name,
    ingredients: ingredients,
    created_by: unformatted[0].username,
  };
};

const create = async (recipe) => {
  const [id] = await db("recipes").insert(recipe).returning("recipe_id");
  return db("recipes").where({ recipe_id: id }).first();
};

const updateById = async (id, recipe) => {
  await db("recipes").where("recipe_id", id).update(recipe);
  return getById(id);
};

const remove = async (id) => {
  const deleted = await getById(id);
  await db("recipes").where("recipe_id", id).delete();
  return deleted;
};

module.exports = {
  get,
  getById,
  create,
  remove,
  updateById,
};
