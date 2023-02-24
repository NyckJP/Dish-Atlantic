import express from "express"
import YelpClient from "../../../apiClient/YelpClient.js"
import Review from "../../../models/Review.js"

const restaurantsRouter = new express.Router()

restaurantsRouter.get("/:city", async (req, res) => {
    const { city } = req.params
    try {
        const restaurantData = await YelpClient.getRestaurants(city)
        const restaurants = JSON.parse(restaurantData.body)
        return res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
        return res.status(error.status)
    }
})

restaurantsRouter.get("/show/:id", async (req, res) => {
    const { id } = req.params

    try {
        const singleRestaurantData = await YelpClient.getRestaurant(id)
        const singleRestaurant = JSON.parse(singleRestaurantData.body)
        singleRestaurant.reviews = await Review.query().where("restaurantId", "=", id)
        return res.status(200).json(singleRestaurant)
    } catch (error) {
        console.log(error)
        return res.status(error.status)
    }
})

export default restaurantsRouter