import React from "react"
import axios from "axios"


export async function searchRestaurantsByLocation(input) {

    const uri = 'http://localhost:8081/search/location/'+input.replaceAll(' ', '+');

    const restaurantsResults = await axios.get(decodeURIComponent(uri)).catch(err => console.log(err))
    
    let restaurantsArray = restaurantsResults.data.businesses

    return(restaurantsArray)
}

export async function getRestaurantById(restaurantId) {
    
    const restaurant = await axios.get('http://localhost:8081/search/restaurant/' + restaurantId).catch(err => console.log(err))

    return restaurant.data
}