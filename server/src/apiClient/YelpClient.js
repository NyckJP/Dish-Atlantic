import got from "got"
import dotenv from "dotenv"
dotenv.config();

const yelpKey = process.env.YELP_KEY

class YelpClient {
    static async getRestaurants(city) {
        try {
            const url = `https://api.yelp.com/v3/businesses/search?location=${city}&sort_by=best_match&limit=20`
            const response = await got(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: yelpKey
                }
            })
            return response
        } catch (error) {
            console.log(`Error in YelpClient: ${error}`)
        }
    }

    static async getRestaurant(id) {
        try {
            const url = `https://api.yelp.com/v3/businesses/${id}`
            const response = await got(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: yelpKey
                }
            })
            return response
        } catch (error) {
            console.log(`Error in YelpClient: ${error}`)
        }
    }
}

export default YelpClient