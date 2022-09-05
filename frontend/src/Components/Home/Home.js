import React from 'react'


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
                <button>Create Event</button>
            </div>
        </div>
    )
};
