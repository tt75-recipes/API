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
    .createTable("instructions", (tbl) => {
      tbl.increments("instruction_id");
      tbl.text("instruction", 256).notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.text("title").notNullable();
      tbl.text("source").notNullable();
      tbl.text("ingredients").notNullable();
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
    .createTable("recipe_instructions", (tbl) => {
      tbl.increments("recipe_instructions_id");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
      tbl
        .integer("instruction_id")
        .unsigned()
        .notNullable()
        .references("instruction_id")
        .inTable("instructions")
        .onDelete("CASCADE");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("recipe_instructions")
    .dropTableIfExists("recipes")
    .dropTableIfExists("instructions")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
