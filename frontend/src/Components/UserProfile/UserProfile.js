import React, { useState, useEffect } from 'react'
import { getEventsByUserId, getFavoritesByUserId } from '../SearchBar/SearchFunctions'
import EventThumbnail from '../EventPage/EventThumbnail'
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail'
import "./UserProfile.css"



export const UserProfile = (props) => {

  const username = props.user.username
  const userId = props.user.id;

  const [eventData, setEventData] = useState()
  const [eventThumbnails, setEventThumbnails] = useState()
  const [favoriteData, setFavoriteData] = useState()
  const [favoriteThumbnails, setFavoriteThumbnails] = useState()
  const [favCount, setFavCount] = useState(0);

  const [page, setPage] = useState('events')

  function updateFavorites() {
    setFavCount(prevFavCount => prevFavCount + 1)
  }

  function sidebarClick(pageName) {
    setPage(pageName)
  }

  useEffect(() => {
    /** retrieves current information from database 
     * resets when database information is changed like user
     * deleting a favorite
    */
    Promise
      .resolve(getEventsByUserId(userId))
      .then(value => setEventData(value))
    Promise
      .resolve(getFavoritesByUserId(userId))
      .then(value => setFavoriteData(value))

  }, [userId, favCount])

  useEffect(() => {
    if (eventData !== undefined) {
      /** displays clickable thumbnails - goes to detailed event page */
      let displayEventThumbnails = eventData.map((userEvent) => {
        return <EventThumbnail key={userEvent.eventId} event={userEvent} />
      })
      setEventThumbnails(displayEventThumbnails)
    }

    if (favoriteData !== undefined) {
      /** displays user favorites, can be deleted */
      let displayFavThumbnails = favoriteData.map((userFav, i) => {
        const restaurant = {
          id: userFav.favoriteId.restaurantId,
          name: userFav.restaurantName,
          image_url: userFav.imageUrl
        }
        if (userFav.favorite) {
          return <RestaurantThumbnail
            key={i}
            restaurant={restaurant}
            showFavBtn={true}
            userId={userId}
            updateFavorites={updateFavorites}
          />
        }
        return undefined;//react was whining about needing return at the end
      })
      setFavoriteThumbnails(displayFavThumbnails)
    }


  }, [eventData, favoriteData, userId, page])//react was whining about needing userId

  return (

    <div className='profileContainer'>
      <div className='profile--sidebar'>
        <h1 className='profile--sidebar-username'>{username}</h1>
        <button 
        className='profile--sidebar-btn'
        onClick={(e) => sidebarClick('events')}>
          Events
        </button>
        <button 
        className='profile--sidebar-btn'
        onClick={(e) => sidebarClick('favorites')}>
          Favorites
        </button>
      </div>
      <div title="Profile" className='profile'>
        {page === 'events' ?
          <div className='profile--array-container'>
            <h2>Events</h2>
            <div md={6} className='profile--events'>
              {eventThumbnails}
            </div>
          </div>
          :
          <div className='profile--array-container'>
            <h2>Favourites</h2>
            <div md={6} className='profile--events'>
              {favoriteThumbnails}
            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default UserProfile;
