exports.up = knex => knex.schema.createTable("dishs", table => {
    table.increments("id")
    table.text("name")
    table
        .enum("category", ["meal", "dessert", "drink"], { useNative: true, enumName: "categories" })
        .notNullable().default("meal")
    table.text("price")
    table.text("description")
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("dishs")