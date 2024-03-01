import { Review } from "../../models/index.js"

class ReviewSeeder {
    static async seed() {
        await Review.query().delete()

        //Gramercy Tavern
        const Review1 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "Went for dinner and had a great time!",
            userId: 9,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review2 = await Review.query().insert({
            topic: "Roasted Duck",
            recommended: true,
            content: "Duck is one of my favorite meals to prepare at home but for the way it's done here, I will be coming here more often!",
            userId: 1,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review3 = await Review.query().insert({
            topic: "Hanger Steak",
            recommended: true,
            content: "The mushrooms, kale, and pickled shallots make this a great menu item.",
            userId: 13,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review4 = await Review.query().insert({
            topic: "Price",
            recommended: false,
            content: "The food is ok, but now I can't pay rent this month.",
            userId: 14,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review5 = await Review.query().insert({
            topic: "Chocolate Cream Pie",
            recommended: true,
            content: "I was skeptical of them including pears but it turned out really good!",
            userId: 5,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review6 = await Review.query().insert({
            topic: "Experience",
            recommended: false,
            content: "Wanted to go with a party of eight but the maximum is 6 people. Unfornate if you have a larger family.",
            userId: 2,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })
        const Review7 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "One of the best places to eat in NYC. I even proposed to my fiance here! 10/10",
            userId: 15,
            restaurantId: "veq1Bl1DW3UWMekZJUsG1Q"
        })

        //Anytime Kitchen
        const Review8 = await Review.query().insert({
            topic: "Vegetable Dumplings",
            recommended: true,
            content: "Some of the best dumplings I've ever had.",
            userId: 11,
            restaurantId: "VvsZAnEwU4c8Xkyrzx05Nw"
        })
        const Review9 = await Review.query().insert({
            topic: "Fresh Lemon Soju",
            recommended: true,
            content: "The cocktails come in interesting little pouches but were my favorite part!",
            userId: 2,
            restaurantId: "VvsZAnEwU4c8Xkyrzx05Nw"
        })
        const Review10 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "My time there was enjoyable, though it was a little difficult to find at first, because it is on the third floor.",
            userId: 4,
            restaurantId: "VvsZAnEwU4c8Xkyrzx05Nw"
        })
        const Review11 = await Review.query().insert({
            topic: "Brisket Tteokbokki",
            recommended: true,
            content: "You'd probably need to be 3x spelling bee champion globally to remember the name, but the food is good.",
            userId: 12,
            restaurantId: "VvsZAnEwU4c8Xkyrzx05Nw"
        })
        const Review12 = await Review.query().insert({
            topic: "Experience",
            recommended: false,
            content: "Some of the menu items are of rather lower quality. Might as well cook at home.",
            userId: 6,
            restaurantId: "VvsZAnEwU4c8Xkyrzx05Nw"
        })

        //Up Thai
        const Review13 = await Review.query().insert({
            topic: "Fried Banana with Coconut Ice Cream",
            recommended: true,
            content: "I didn't even know you could fry bananas!",
            userId: 7,
            restaurantId: "-OixbLnFLCzQclxCSbUQ8w"
        })
        const Review14 = await Review.query().insert({
            topic: "Thai-Herbed Wings",
            recommended: true,
            content: "I've ordered from here a few times, the appetizers are amazing. I recommend the Thai-Herbed Wings.",
            userId: 8,
            restaurantId: "-OixbLnFLCzQclxCSbUQ8w"
        })
        const Review15 = await Review.query().insert({
            topic: "Noodles",
            recommended: true,
            content: "The noodles here are phenomenal.",
            userId: 10,
            restaurantId: "-OixbLnFLCzQclxCSbUQ8w"
        })

        //Olio E Piu
        const Review16 = await Review.query().insert({
            topic: "Pollo Panini",
            recommended: true,
            content: "If you are having brunch here, you must ty the pollo panini, with the roasted chicken, lettuce, and tomato in it.",
            userId: 9,
            restaurantId: "16ZnHpuaaBt92XWeJHCC5A"
        })
        const Review17 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "The customer service was excellent and the people were very nice to me.",
            userId: 13,
            restaurantId: "16ZnHpuaaBt92XWeJHCC5A"
        })
        const Review18 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "Has a really pleasant atmosphere and I had a delightful time.",
            userId: 11,
            restaurantId: "16ZnHpuaaBt92XWeJHCC5A"
        })
        const Review19 = await Review.query().insert({
            topic: "Food",
            recommended: false,
            content: "I found the food to be bland.",
            userId: 6,
            restaurantId: "16ZnHpuaaBt92XWeJHCC5A"
        })

        //Rubirosa
        const Review20 = await Review.query().insert({
            topic: "Experience",
            recommended: true,
            content: "I order here frequently, everything is good.",
            userId: 14,
            restaurantId: "WG639VkTjmK5dzydd1BBJA"
        })
        const Review21 = await Review.query().insert({
            topic: "Pizza",
            recommended: true,
            content: "Has vegan topping options, which is always good for a restaurant to have.",
            userId: 3,
            restaurantId: "WG639VkTjmK5dzydd1BBJA"
        })
    }
}

export default ReviewSeeder