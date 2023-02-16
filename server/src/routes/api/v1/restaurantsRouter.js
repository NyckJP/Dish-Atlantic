import express from "express"
import YelpClient from "../../../apiClient/YelpClient.js"

const restaurantsRouter = new express.Router()

restaurantsRouter.get("/:city", async (req, res) => {
    const { city } = req.params
    try {
        const restaurantData = await YelpClient.getRestaurants(city)
        const restaurants = JSON.parse(restaurantData.body)
        res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(error.status)
    }
})

export default restaurantsRouter