/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("cachedRestaurants", table => {
        table.bigIncrements("id")
        table.string("restaurantId").notNullable()
        table.string("imageUrl")
        table.string("name").notNullable()
        table.string("address1")
        table.string("address2")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("cachedRestaurants")
}
