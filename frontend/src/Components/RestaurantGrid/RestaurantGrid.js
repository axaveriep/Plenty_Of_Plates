import React, { useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import RestaurantCard from "../RestaurantCard/RestaurantCard"


export default function RestaurantGrid(props) {

    const [restaurants, setRestaurants] = useState([])

    async function addRestaurants(restaurantsArray) {
        // console.log(Promise.resolve(restaurantsArray).then())
        Promise.resolve(restaurantsArray).then(value => {
            setRestaurants(value)
        })

        console.log(restaurants)
        // let restaurantsReturned = await Promise.all(restaurantsArray)

        // console.log(restaurantsReturned)

        // setRestaurants(prevRestaurants => {
        //     return [...prevRestaurants, restaurantsReturned]
        // })
    }

    function removeRestaurant(event, id){
        //setRestaurants({restaurants: restaurants.filter(function(restaurant) 
        //    { return restaurant.id !== id })});
        for (const restaurant of restaurants)
        {
            if (restaurant.id === id)
            {
                // console.log("selected for removal: ", restaurant)
                // console.log("at index of: ", restaurants.indexOf(restaurant))
                // console.log("restaurants in list: ", restaurants)
                removeItem(restaurants.indexOf(restaurant))
            }
        }
    }

    function removeItem(index){
        setRestaurants(restaurants.filter((o, i) => index !== i));
    };

    let displayedRestaurants = restaurants.map((restaurant, i) => {
        return (<RestaurantCard key={i} restaurant={restaurant} removeRestaurant={removeRestaurant}/>)
    })

    return(
        <div className="restaurant--grid">Grid to Display Collection of Restaurant Cards
            <SearchBar 
            searchType={'RESTAURANTS_LOCATION'} 
            addRestaurants={addRestaurants}
            />
            {displayedRestaurants}
            
        </div>
    )
}