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
                <address className='restaurant--address'>{props.restaurant.location.display_address}
                {/** adjust display address to not show on one line */}</address>
                <p><a href="tel:(123)456-7890">{props.restaurant.display_phone}</a></p>
                <img className='restaurant--image' src={props.restaurant.image_url}/>
                {/* <p className='restaurant--description'>Description</p> */}
                
                
                <h3 className="">Hours</h3>
                {/* to get Hours and if business is currently open, we will have to make another call to the API for restaurant details
                using the Restaurant Id
                
                -- convert Hours to a button that makes that call and 
                shows info */}
            <div className="rating">Rating: {props.restaurant.rating}</div>
            <div className="restaurant--buttons"><button className="restaurant--favorite">Add to Favorites</button> 
            <button className='restaurant--add-to-event' onClick={() => props.selectRestaurant(props.restaurant)}>Add To Event</button>
            <button className="closeBtn" onClick={(event) => props.removeRestaurant(event, props.restaurant.id)}>X</button></div>
            </div>
        </div>
    )
}