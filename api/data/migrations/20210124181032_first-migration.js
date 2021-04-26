exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.text("username", 200).unique().notNullable();
      tbl.text("password", 256).notNullable();
    })
    .createTable("categories", (tbl) => {
      tbl.increments("category_id");
      tbl.text("category_name", 128).unique().notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.text("title").notNullable();
      tbl.text("source").notNullable();
      tbl.text("ingredients").notNullable();
      tbl.text("instructions").notNullable();
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("category_id")
        .inTable("categories")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
