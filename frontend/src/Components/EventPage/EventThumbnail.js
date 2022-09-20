import React from 'react'
import { Link } from 'react-router-dom'
import './EventThumbnail.css'

function EventThumbnail({event}) {

  return (
    <div className="event-thumbnail--container">
        <Link to={{
            pathname: `/results/`,
            state: {
              savedEvent: event
            }
          }}>
            <div>{event.title}</div>
            </Link><br />
        <div>{event.date}</div>
    </div>
  )
}

export default EventThumbnail