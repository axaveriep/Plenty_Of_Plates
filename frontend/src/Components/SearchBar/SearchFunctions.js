import React from "react"
import axios from "axios"


export async function searchRestaurantsByLocation(input) {

    const uri = 'http://localhost:8081/search/location/'+input.replaceAll(' ', '+');

    const restaurantsResults = await axios.get(decodeURIComponent(uri)).catch(err => console.log(err))
    
    let restaurantsArray = restaurantsResults.data.businesses

    return(restaurantsArray)
}

export async function getRestaurantById(restaurantId) {
<<<<<<< HEAD

    const restaurant = await axios.get('http://localhost:8081/search/restaurant/' + restaurantId).catch(err => console.log(err))

=======
    
    const restaurant = await axios.get('http://localhost:8081/search/restaurant/' + restaurantId).catch(err => console.log(err))

>>>>>>> 72ca4799aaec6f6805406b5d71d6349581fca7cc
    return restaurant.data
}