import React from 'react'

export default function Home(props) {
    return(
        <div>
            
            <p>Welcome back User, Just pick a place!</p>
            <div className="home--search">
                {/*restaurant image*/}
                {/*button or search bar - search for restaurants*/}
                <input placeholder='Search...'/>
            </div>
            <div className="home--create-event">
                {/*event image*/}
                {/*button - create event*/}
                <button>Create Event</button>
            </div>
        </div>
    )
};
