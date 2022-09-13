import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid'


export default function Home(props) {
    return (
        <div>
            <h2>Welcome back {props.username}, Just pick a place!</h2>
            {/* <div className="home--search">
                
                <SearchBar searchType={'RESTAURANTS_LOCATION'}/>
            </div> */}
            <div>
                <RestaurantGrid hideAddBtn={true} hideRemoveBtn={true}/>
            </div>

            <div className="home--create-event">
                {/*event image*/}
                <Link to="/EventPage" ><button className="btn">Create Event</button></Link>
            </div>


        </div>
    )
};
