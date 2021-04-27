exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("categories").insert([
        { category_name: "sandwiches" },
        { category_name: "dinner" },
        { category_name: "breakfast" },
      ]);
    });
};
