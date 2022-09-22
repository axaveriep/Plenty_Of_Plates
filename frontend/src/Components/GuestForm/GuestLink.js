import React from 'react'
import {useSelector} from 'react-redux'
import { UncontrolledTooltip } from 'reactstrap';
import './GuestLink.css'

export default function GuestLink({guestName, guestId, guestEmail, eventId}) {

  const username = useSelector((state) => state.user.username)

  return (
    <div className="event--confirmed-guest">
      <label className='guest--name-label'>{guestName}</label>
      <input className="guest--name-input" id="input--eventLink" type='text' readOnly={true} value={`localhost:3000/vote/${eventId}/${guestId}`} />
      <button id="copyBtn" className='copyBtn' onClick={() => navigator.clipboard.writeText(`localhost:3000/vote/${eventId}/${guestId}`)}>Copy</button>
      <UncontrolledTooltip target="copyBtn" trigger="click" autohide={true} placement='top'>Copied!</UncontrolledTooltip>
      {guestEmail === "" ? <></> : guestEmail === undefined ? <></> : 
      <button className='emailBtn'><a href={`mailto:${guestEmail}?&subject=${username} has invited you out!&body=Click this link localhost:3000/vote/${eventId}/${guestId}`} target="_blank" rel="noreferrer">E-mail Link</a></button>}
    </div>)
};