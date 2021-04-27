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
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.text("ingredient_name").notNullable();
      tbl.text("measurement").notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.text("title").notNullable();
      tbl.text("source").notNullable();
      tbl.text("instructions", 686).notNullable();
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
    })
    .createTable("recipe_ingredients", (tbl) => {
      tbl.increments("recipe_ingredients_id");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("recipe_ingredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
