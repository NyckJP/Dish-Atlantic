/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("savedIds", table => {
        table.bigIncrements("id")
        table.bigInteger("userId").notNullable().references("users.id")
        table.string("restaurantId").notNullable()
        table.string("savedAs").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("savedIds")
}
