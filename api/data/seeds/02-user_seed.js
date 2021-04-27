exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "nick",
          password:
            "$2a$10$xKAqY796M8gXcwzhc5bJfOf6CXRYWn8Gd8zZqoq8W5ultL7ok9YTS",
        },
        {
          username: "admin",
          password:
            "$2a$10$1A6Apnt6i80fF5SrPOfox.xCZ2yHMMV/0Zdw.Fzz/mXh7TN03x2ca",
        },
        {
          username: "user",
          password:
            "$2a$10$bqi4U3JDhH90TUBptmPL2uk7GknPeMpZlZlXAht0qE4aA7NWYAAwq",
        },
      ]);
    });
};
