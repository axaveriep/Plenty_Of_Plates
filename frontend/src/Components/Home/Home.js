import React from 'react'
import {Link} from 'react-router-dom'


export default function Home(props) {
    return(
        <div>
            <h2>Welcome back {props.username}, Just pick a place!</h2>
            <div className="home--search">
                {/*restaurant image*/}
                <input placeholder='Search...'/>
            </div>

            <div className="home--create-event">
                {/*event image*/}
                <Link to="/EventPage" ><button className="btn">Create Event</button></Link>
            </div>
        </div>
    )
};
