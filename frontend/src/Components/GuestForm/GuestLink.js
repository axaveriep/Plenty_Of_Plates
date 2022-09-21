import React from 'react'
import {useSelector} from 'react-redux'
import './GuestLink.css'

function GuestLink({guestName, guestId, guestEmail, eventId}) {

  const username = useSelector((state) => state.user.username)

  return (
    <div className="event--confirmed-guest">
      <label>{guestName}</label>
      <input id="input--eventLink" type='text' readOnly={true} value={`localhost:3000/vote/${eventId}/${guestId}`} />
      <button onClick={() => navigator.clipboard.writeText(`localhost:3000/vote/${eventId}/${guestId}`)}>Copy</button>
      {guestEmail === "" ? <></> : guestEmail === undefined ? <></> : 
      <button><a href={`mailto:${guestEmail}?&subject=${username} has invited you out!&body=Click this link localhost:3000/vote/${eventId}/${guestId}`} target="_blank" rel="noreferrer">E-mail Link</a></button>}
    </div>)
}

export default GuestLink