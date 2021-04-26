const db = require("../data/db-config");

const get = () => {
  return db("users");
};

const getById = (id) => {
  return db("users").where({ user_id: id });
};

const create = async (user) => {
  const [id] = await db("users").insert(user).returning("user_id");
  console.log(id);
  return db("users").where({ user_id: id }).first();
};

const remove = async (id) => {
  const deleted = await getById(id);
  await db("users").where({ user_id: id });
  return deleted;
};

module.exports = {
  get,
  getById,
  create,
  remove,
};
