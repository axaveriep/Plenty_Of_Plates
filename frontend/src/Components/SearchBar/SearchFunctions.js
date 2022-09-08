import React from "react"
import axios from "axios"
// import { bearerToken } from "../../Shared/bearerToken"

// const config = {
//     headers: {
//         'Authorization': `Bearer ${bearerToken}`
//     }
// };

//'https://api.yelp.com/v3/businesses/search?location=' + input, config

export async function searchRestaurantsByLocation(input) {

    console.log(input)

    const restaurantsResults = await axios.get(`http://localhost:8081/search/location/${input}`).catch(err => console.log(err))
    
    console.log(restaurantsResults)
}

// export async function getRestaurantById(restaurantId) {

//     const restaurant = await axios.get('https://api.yelp.com/v3/businesses/' + restaurantId, config).catch(err => console.log(err))

//     return restaurant.data
// }