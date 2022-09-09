import './EventPage.css'
import { react, useState } from 'react'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid';
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail';

export default function EventPage() {
    const [eventTitle, setEventTitle] = useState('Event Title');

    const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10))

    const [selectedRestuarants, setSelectedRestaurants] = useState([])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEventTitle(event.target.textContent)

        }
    }

    function selectRestaurant(restaurant) {
        setSelectedRestaurants(prevSelectedRestaurants => {
            return [...prevSelectedRestaurants, restaurant]
        })
    }

    function removeRestaurant(id) {
        setSelectedRestaurants(prevSelectedRestaurants => {
            return prevSelectedRestaurants.filter(restaurant => restaurant.id !== id)
        })
    }



    let restaurantThumbnails = selectedRestuarants.map((restaurant, i) => {
        return <RestaurantThumbnail key={i} restaurant={restaurant} removeRestaurant={removeRestaurant} />
    })

    return (
        <div className="container">
            <h1
                contenteditable="true"
                className="event--title"
                onKeyDown={handleKeyDown}
                onBlur={e => (setEventTitle(e.currentTarget.textContent))}>
                {eventTitle}
            </h1>
            <input
                type="date"
                name="event--date"
                defaultValue={eventDate}
                value={eventDate}
                onChange={e => (setEventDate(e.currentTarget.value))} />
            <br />
            <RestaurantGrid selectRestaurant={selectRestaurant}/>
            <div className="event--selectedRestuarants">
                
                {restaurantThumbnails}
            </div>
            {/* <button className='btn' onClick={ go to Restaurants Grid page? }>Add Restuarants</button> */}
        </div>
    )
}