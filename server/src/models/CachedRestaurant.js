const Model = require("./Model.js")

class CachedRestaurant extends Model {
    static get tableName() {
        return "cachedRestaurants"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["restaurantId", "name"],
            properties: {
                restaurantId: { type: "string" },
                name: { type: "string" }
            }
        }
    }
}

module.exports = CachedRestaurant