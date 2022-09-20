import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./UserProfile.css"
import { getEventsByUserId, getFavoritesByUserId } from '../SearchBar/SearchFunctions'
import EventThumbnail from '../EventPage/EventThumbnail'
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail'

export const UserProfile = (props) => {

  const username = props.user.username
  const userId = props.user.id;

  const [eventData, setEventData] = useState()
  const [eventThumbnails, setEventThumbnails] = useState()
  const [favoriteData, setFavoriteData] = useState()
  const [favoriteThumbnails, setFavoriteThumbnails] = useState()

  useEffect(() => {

    Promise
      .resolve(getEventsByUserId(userId))
      .then(value => setEventData(value))
    Promise
      .resolve(getFavoritesByUserId(userId))
      .then(value => setFavoriteData(value))

  }, [userId])

  useEffect(() => {
    if (eventData !== undefined) {

      let displayEventThumbnails = eventData.map((userEvent) => {
        return <EventThumbnail key={userEvent.eventId} event={userEvent} />
      })
      setEventThumbnails(displayEventThumbnails)
    }

    if (favoriteData !== undefined) {
      let displayFavThumbnails = favoriteData.map((userFav, i) => {
        console.log(userFav)
        const restaurant = {
          name: userFav.restaurantName,
          image_url: userFav.imageUrl
        }
        if (userFav.favorite) {
          return <RestaurantThumbnail key={i} restaurant={restaurant} eventCreated={true} />
        }
      })
      setFavoriteThumbnails(displayFavThumbnails)
    }
  }, [eventData])

  return (

    <div className="fullscreen-container">

      <div title="Profile">
        <div className='profileContainer'>
          <div>
            <h2>{username}'s Events</h2>
            <div md={6} className='profile--events'>
              {console.log(eventData)}
              {eventThumbnails}
            </div>
          </div>
          <div>
            <h2>{username}'s Favourites</h2>
            <div md={6} className='profile--events'>
              {console.log(favoriteData)}
              {favoriteThumbnails}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
