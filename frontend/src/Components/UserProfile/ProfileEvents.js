import React, { useState, useEffect } from 'react'
import { getEventsByUserId } from '../SearchBar/SearchFunctions'
import ProfileSidebar from './ProfileSidebar';
import EventThumbnail from '../EventPage/EventThumbnail'
import "./UserProfile.css"

function ProfileEvents(props) {

    const username = props.user.username
    const userId = props.user.id;

    const [eventData, setEventData] = useState()
    const [eventThumbnails, setEventThumbnails] = useState()

    useEffect(() => {
        /** retrieves current information from database 
         * resets when database information is changed like user
         * deleting a favorite
        */
        Promise
            .resolve(getEventsByUserId(userId))
            .then(value => setEventData(value))

    }, [userId])

    useEffect(() => {
        if (eventData !== undefined) {
            /** displays clickable thumbnails - goes to detailed event page */
            let displayEventThumbnails = eventData.map((userEvent) => {
                return <EventThumbnail key={userEvent.eventId} event={userEvent} />
            })
            setEventThumbnails(displayEventThumbnails)
        }

    }, [eventData, userId])//react was whining about needing userId

    return (
        <div className='profileContainer'>
            <ProfileSidebar username={username} page={'events'}/>
            <div title='Profile' className='profile'>
                <div className='profile--array-container'>
                    <h2>Events</h2>
                    <div md={6} className='profile--events'>
                        {eventThumbnails}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileEvents