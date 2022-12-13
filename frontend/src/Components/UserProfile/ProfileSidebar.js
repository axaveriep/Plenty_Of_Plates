import React from 'react'
import { Link } from 'react-router-dom'
import * as IoIcons from 'react-icons/io5'

function ProfileSidebar(props) {

   

    return (
        <div className='profile--sidebar'>

            <div className='profile--sidebar-username'><IoIcons.IoPersonCircle className='profile--sidebar-icon' /> {props.username}</div>
            <Link to={`/user/${props.username}/events`} className={props.page === 'events' ? 'profile--sidebar-btn active-btn' : 'profile--sidebar-btn'}>
                <button
                className='event-btn'
                
            >
                Events
            </button></Link>
            <Link to={`/user/${props.username}/favorites`} className={props.page === 'favorites' ? 'profile--sidebar-btn active-btn' : 'profile--sidebar-btn'}>
                <button
                className='fav-btn'
                
            >
                Favorites
            </button></Link>
        </div>
    )
}

export default ProfileSidebar

