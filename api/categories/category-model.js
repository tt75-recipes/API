const db = require("../data/db-config");

const get = () => {
  return db("categories");
};

const getById = (id) => {
  return db("categories").where({ category_id: id });
};

const create = async (category) => {
  const [id] = await db("categories").insert(category).returning("category_id");
  return db("categories").where({ category_id: id }).first();
};

const remove = async (id) => {
  const deleted = await getById(id);
  await db("categories").where({ category_id: id });
  return deleted;
};

module.exports = {
  get,
  getById,
  create,
  remove,
};
