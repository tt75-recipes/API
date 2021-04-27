exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { ingredient_name: "chicken" },
        { ingredient_name: "bread" },
        { ingredient_name: "jelly" },
        { ingredient_name: "peanut butter" },
        { ingredient_name: "cereal" },
        { ingredient_name: "milk" },
      ]);
    });
};
