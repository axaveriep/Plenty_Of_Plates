import {Link} from 'react-router-dom'

export default function Home(props) {
    return(
        <div>
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
}