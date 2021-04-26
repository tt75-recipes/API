const db = require("../data/db-config");

const get = () => {
  return db("recipes");
};

const getById = (id) => {
  return db("recipes").where({ recipe_id: id });
};

const create = async (recipe) => {
  const [id] = await db("recipes").insert(recipe).returning("recipe_id");
  return db("recipes").where({ recipe_id: id }).first();
};

const remove = async (id) => {
  const deleted = await getById(id);
  await db("recipes").where({ recipe_id: id });
  return deleted;
};

module.exports = {
  get,
  getById,
  create,
  remove,
};
