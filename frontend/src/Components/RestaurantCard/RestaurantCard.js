import { React, useState, useEffect } from "react"
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import { getRestaurantById } from "../SearchBar/SearchFunctions"
import "./RestaurantCard.css"
import RestaurantHours from "./RestaurantHours"

export default function RestaurantCard(props) {
    const categories = props.restaurant.categories
    const categoryTitles = categories.map((category, i) => {
        if (i < categories.length - 1) { return category.title + " | " }
        else { return category.title }
    })
    const [modal, setModal] = useState(false);

    const [restaurantDetails, setRestaurantDetails] = useState({})

    const[hours, setHours] = useState()

    useEffect(() => {
        Promise
            .resolve(getRestaurantById(props.restaurant.id))
            .then(value => {
                setRestaurantDetails(value)
            })
    }, [modal])

    const toggle = () => {
        setModal(!modal)
        console.log(restaurantDetails)
        console.log(restaurantDetails.hours)
        console.log(restaurantDetails.hours[0].open)
        console.log(restaurantDetails.hours[0].open[0])

        let resthours = restaurantDetails.hours[0].open.map((object, i) => {
            console.log(object)

            return (<RestaurantHours key={i} object={object} />)

        })

        setHours(resthours)
    }

    
    // <span className="badge">{props.restaurant.is_closed ? "Closed" : "Open"}</span>



    function convertTime(time) {
        let hourHand = time.substring(0, 1);
        let minuteHand = time.substring(2, 3);
        let ampm = 'AM';
        if (hourHand >= 12) { ampm = 'PM' }
        if (hourHand > 12) {
            hourHand = hourHand - 12;
        }
        return hourHand + ':' + minuteHand + ' ' + ampm;
    }


    return (
        <div>
            <div className="restaurant--container">
                <div className='restaurant--name'>{props.restaurant.name}</div>
                <div className='restaurant--type'>{categoryTitles}</div>
                <address className='restaurant--address'>{props.restaurant.location.display_address}
                    {/** adjust display address to not show on one line */}</address>
                <p><a href="tel:(123)456-7890">{props.restaurant.display_phone}</a></p>
                <img className='restaurant--image' src={props.restaurant.image_url} />
                {/* <p className='restaurant--description'>Description</p> */}
                <Button className="" onClick={toggle}>Hours</Button>
                {/* to get Hours and if business is currently open, we will have to make another call to the API for restaurant details
                using the Restaurant Id
                
                -- convert Hours to a button that makes that call and 
                shows info */}
                <Modal isOpen={modal} toggle={toggle} className="modal-dialog" scrollable={true}>
                    <ModalHeader className="header">
                        {props.restaurant.name} Hours <br />
                        {restaurantDetails.hours === undefined ? '' : restaurantDetails.hours[0].is_open_now ? "Open Now" : "Closed"}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        {console.log(props.restaurant.name)}
                        {hours === undefined ? <></> : <>{hours}</>}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggle}>Okay</Button>
                    </ModalFooter>
                </Modal>
                <div className="rating">Rating: {props.restaurant.rating}</div>
                <div className="restaurant--buttons">
                    <button className="restaurant--favoriteBtn">Add to Favorites</button>
                    {props.hideAddBtn ? <></> : <button className="restaurant--addBtn" onClick={() => props.selectRestaurant(props.restaurant)}>Add To Event</button>}
                    {props.hideRemoveBtn ? <></> : <button className="restaurant--removeBtn" onClick={(event) => props.removeRestaurant(event, props.restaurant.id)}>X</button>}
                </div>
            </div>
        </div>
    )
}