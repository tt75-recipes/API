exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { ingredient_name: "chicken", measurement: "1lb" },
        { ingredient_name: "bread", measurement: "1loaf" },
        { ingredient_name: "jelly", measurement: "1jar" },
        { ingredient_name: "peanut butter", measurement: "1jar" },
        { ingredient_name: "cereal", measurement: "3cups" },
        { ingredient_name: "milk", measurement: "1cup" },
      ]);
    });
};
