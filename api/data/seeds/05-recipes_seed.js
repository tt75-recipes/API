exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          title: "pb&j",
          source: "Food show",
          instructions: "Combine ingredients",
          category_id: 1,
          user_id: 1,
        },
        {
          title: "chicken",
          source: "Farm Animals",
          instructions: "Cook the chicken",
          category_id: 2,
          user_id: 2,
        },
        {
          title: "cereal",
          source: "Easy Breakfast foods",
          instructions: "Put cereal and milk in a bowl",
          category_id: 3,
          user_id: 3,
        },
      ]);
    });
};
