import axios from "axios"
import { baseUrl } from "../../Shared/baseUrl";


export async function searchRestaurantsByLocation(input) {

    const uri = baseUrl+"/search/location/"+input.replaceAll(" ", "+");

    const restaurantsResults = await axios.get(decodeURIComponent(uri)).catch(err => console.log(err))
    
    let restaurantsArray = restaurantsResults.data.businesses

    return(restaurantsArray)
}

export async function getRestaurantById(restaurantId) {

    const restaurant = await axios.get(baseUrl+"/search/restaurant/" + restaurantId).catch(err => console.log(err))

    return restaurant.data
}