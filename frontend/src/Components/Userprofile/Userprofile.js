import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./UserProfile.css"
import { getEventsByUserId } from '../SearchBar/SearchFunctions'
import EventThumbnail from '../EventPage/EventThumbnail'

export const UserProfile = (props) => {

  const username = props.user.username
  const userId = props.user.id;

  const [eventData, setEventData] = useState()
  const [eventThumbnails, setEventThumbnails] = useState()

  useEffect(() => {
    console.log(props.user)
    Promise
      .resolve(getEventsByUserId(userId))
      .then(value => setEventData(value))
  }, [userId])

  useEffect(() => {
    if (eventData !== undefined) {
      let displayEventThumbnails = eventData.map((userEvent) => {
        return <EventThumbnail key={userEvent.eventId} event={userEvent} />
      })
      setEventThumbnails(displayEventThumbnails)
    }
  }, [eventData])

  return (
    <div title="Profile">
      <div className='profileContainer'>
        <div><h2>{username}'s Events</h2>
          <div md={6} className='profile--events'>

            {console.log(eventData)}
            {eventThumbnails}
          </div>
        </div>
        <div> {username}'s Favourites

        </div>
      </div>
    </div>
  )
}

export default UserProfile;
