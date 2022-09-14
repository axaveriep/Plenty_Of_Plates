import React from 'react'
import './EventThumbnail.css'

function EventThumbnail({event}) {

  return (
    <div className="event-thumbnail--container">
        <div>{event.title}</div><br />
        <div>{event.date}</div>
    </div>
  )
}

export default EventThumbnail