import { CachedRestaurant } from "../models/index.js"
import YelpClient from "../apiClient/YelpClient.js"

const isVerified = (existingCache) => {
    if (!existingCache) {
        return false
    }

    const cacheTimestamp = existingCache.createdAt.getTime()
    const currentTime = new Date().getTime()
    if (currentTime - cacheTimestamp >= 24 * 60 * 60 * 1000) {
        return false
    }

    return true    
}

const findCache = async (savedIds) => {
    let cacheList = []

    for (let i = 0; i < savedIds.length; i++) {
        const existingCache = await CachedRestaurant.query().findOne("restaurantId", "=", savedIds[i].restaurantId)
        if (!isVerified(existingCache)) {
            if (existingCache) {
                await CachedRestaurant.query().findOne("restaurantId", "=", savedIds[i].restaurantId).delete()
            }
            const singleRestaurantData = await YelpClient.getRestaurant(savedIds[i].restaurantId)
            const singleRestaurant = JSON.parse(singleRestaurantData.body)
            const newCache = {
                restaurantId: singleRestaurant.id,
                imageUrl: singleRestaurant.image_url,
                name: singleRestaurant.name,
                address1: singleRestaurant.location.display_address[0],
                address2: singleRestaurant.location.display_address[singleRestaurant.location.display_address.length - 1]
            }
            const newCacheEntry = await CachedRestaurant.query().insertAndFetch(newCache)
            cacheList.push(newCacheEntry)
        } else {
            cacheList.push(existingCache)
        }
    }

    return cacheList
}

export default findCache