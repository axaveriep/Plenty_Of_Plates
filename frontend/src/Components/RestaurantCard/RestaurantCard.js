//maybe reuse this to also render the smaller card versions that are displayed in the grid
//showing only the picture and restaurant name.
import "./RestaurantCard.css"

export default function RestaurantCard(props) {

    const categories = props.restaurant.categories
    const categoryTitles = categories.map((category, i) => {
       if(i<categories.length-1) {return category.title + " | "}
       else { return category.title}
    })

    // <span className="badge">{props.restaurant.is_closed ? "Closed" : "Open"}</span>

    return(
        <div>
            <div className="restaurant--container">
                <div className='restaurant--name'>{props.restaurant.name}</div>
                <div className='restaurant--type'>{categoryTitles}</div>
                <address className='restaurant--address'>{props.restaurant.location.display_address}</address>
                <p><a href="tel:(123)456-7890">{props.restaurant.display_phone}</a></p>
                <img className='restaurant--image' src={props.restaurant.image_url}/>
                {/* <p className='restaurant--description'>Description</p> */}
                
                
                <h3 className="">Hours</h3>
                {/* <ul className='restaurant--hours'>
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
                </ul>*/}
            <div className="rating">Rating: {props.restaurant.rating}</div>
            <div className="restaurant--buttons"><button className="restaurant--favorite">Add to Favorites</button> <button className='restaurant--add-to-event'>Add To Event</button><button className="closeBtn" onClick={(event) => props.removeRestaurant(event, props.restaurant.id)}>X</button></div>
            </div>
        </div>
    )
}