const Model = require("./Model.js")

class SavedId extends Model{
    static get tableName() {
        return "savedIds"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["userId", "restaurantId", "savedAs"],
            properties: {
                userId: { type: ["string", "integer"] },
                restaurantId: { type: "string" },
                savedAs: { type: "string"}
            }
        }
    }
}

module.exports = SavedId