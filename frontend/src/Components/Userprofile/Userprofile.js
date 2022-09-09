import React from 'react'
import { Link } from 'react-router-dom'
import "./Userprofile.css"

export const Userprofile = (props) => {
  return (
    <div title  = "Profile">
        <div className='profileContainer'>
            <div md={6}> {props.username}'s Events

            </div>
            <div> {props.username}'s Favourites 

            </div>
       </div>
    </div>
  )
}

export default Userprofile;
