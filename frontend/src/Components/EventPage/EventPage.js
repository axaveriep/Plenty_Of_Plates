import './EventPage.css'
import {react, useState} from 'react'
import RestaurantCard from '../RestaurantCard/RestaurantCard'

export default function EventPage()
{
    var [eventTitle, setEventTitle] = useState('Event Title');

    var [eventDate, setEventDate] = useState(new Date().toISOString().slice(0,10))

    var [restaurants, setRestaurants] = useState([{name: "Test 1", id: "0001"}])

    function removeRestaurant(event, id){
        //setRestaurants({restaurants: restaurants.filter(function(restaurant) 
        //    { return restaurant.id !== id })});
        for (const restaurant of restaurants)
        {
            if (restaurant.id === id)
            {
                console.log("selected for removal: ", restaurant)
                console.log("at index of: ", restaurants.indexOf(restaurant))
                console.log("restaurants in list: ", restaurants)
                removeItem(restaurants.indexOf(restaurant))
            }
        }
    }
    function removeItem(index){
        setRestaurants(restaurants.filter((o, i) => index !== i));
    };


    function addRestaurant(restaurant) {
        setRestaurants(prevRestaurants =>( [...prevRestaurants, restaurant]))
    }

    let displayedRestaurants = restaurants.map((restaurant, i) => {
        return (<RestaurantCard key={i} restaurant={restaurant} removeRestaurant={removeRestaurant}/>)
    })

    return(
        <div className="container">
            <h1 
                contenteditable="true" 
                className="event--title" 
                onBlur={e => (setEventTitle(e.currentTarget.textContent))}>
                {eventTitle}
            </h1>
            <input 
                type="date" 
                name="event--date" 
                defaultValue={eventDate} 
                value={eventDate} 
                onChange={e => (setEventDate(e.currentTarget.value))}/>
                <br/>
            <div className="event--selectedRestuarants">
            {displayedRestaurants}
            </div>
            <button className='btn' onClick={()=> addRestaurant({
                name: "Test Restaurant Name",
                id: "1234"  
            })}>Add Restuarant</button>
        </div>
    )
}