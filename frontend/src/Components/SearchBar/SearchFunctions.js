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

    const uri = 'http://localhost:8081/search/location/'+input.replaceAll(' ', '+');

    const restaurantsResults = await axios.get(decodeURIComponent(uri)).catch(err => console.log(err))
    
    let restaurantsArray = restaurantsResults.data.businesses
    console.log(restaurantsArray)

    return(restaurantsArray)
}

// export async function getRestaurantById(restaurantId) {

//     const restaurant = await axios.get('https://api.yelp.com/v3/businesses/' + restaurantId, config).catch(err => console.log(err))

//     return restaurant.data
// }