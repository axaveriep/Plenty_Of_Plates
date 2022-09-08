//maybe reuse this to also render the smaller card versions that are displayed in the grid
//showing only the picture and restaurant name.
import "./RestaurantCard.css"

export default function RestaurantCard(props) {

    return(
        <div>
            <div className="restaurant--container">
                <h1 className='restaurant--name'>{props.restaurant.name}<span class="badge">Closed</span></h1>
                <h2 className='restaurant--type'>Type</h2>
                <address className='restaurant--address'>123 Fake st Maydup, State 10101</address>
                <p><a href="tel:(123)456-7890">(123)456-7890</a></p>
                <img className='restaurant--image' src=""/>
                <p className='restaurant--description'>Description</p>
                <button className="restaurant--favorite">Add to Favorites</button>
                <button className="closeBtn" onClick={(event) => props.removeRestaurant(event, props.restaurant.id)}>X</button>
                <h3>Hours</h3>
                <ul className='restaurant--hours'>
                    <li className='hours monday'>
                        <p>Mon: </p>
                        <p>12:00-12:00</p>
                    </li>
                    <li className='hours tuesday'>
                        <p>Tue: </p>
                        <p>12:00-12:00</p>
                    </li>
                    <li className='hours wednesday'>
                        <p>Wed: </p>
                        <p>12:00-12:00</p>
                    </li>
                    <li className='hours thursday'>
                        <p>Thu: </p>
                        <p>12:00-12:00</p>
                        </li>
                    <li className='hours friday'>
                        <p>Fri: </p>
                        <p>12:00-12:00</p>
                    </li>
                    <li className='hours saturday'>
                        <p>Sat: </p>
                        <p>12:00-12:00</p>
                    </li>
                    <li className='hours sunday'>
                        <p>Sun: </p>
                        <p>12:00-12:00</p>
                    </li>
                </ul>
            <div className="rating">*****</div>
            <button className='restaurant--add-to-event'>Add To Event</button>
            </div>
        </div>
    )
}