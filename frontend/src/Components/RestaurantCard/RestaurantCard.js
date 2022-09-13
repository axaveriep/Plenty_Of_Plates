import { React, useState, useEffect } from "react"
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import { getRestaurantById } from "../SearchBar/SearchFunctions"
import "./RestaurantCard.css"

export default function RestaurantCard(props) {
    const categories = props.restaurant.categories
    const categoryTitles = categories.map((category, i) => {
        if (i < categories.length - 1) { return category.title + " | " }
        else { return category.title }
    })
    const [modal, setModal] = useState(false);
    // let operationHours = []
    // let fullDetails = getRestaurantById(props.restaurant.id)
    // Promise.resolve(fullDetails).then(value => {
    //     operationHours.push(value.hours)
    // })

    const [restaurantDetails, setRestaurantDetails] = useState({})

    function doThisStuff() {
        toggle()
        Promise
            .resolve(getRestaurantById(props.restaurant.id))
            .then(value => 
                {
                    setRestaurantDetails(value)
                    mapHours()
                })
    }

    const toggle = () => {
        setModal(!modal)
    }
    // <span className="badge">{props.restaurant.is_closed ? "Closed" : "Open"}</span>

    let hours;
    function mapHours() {
            console.log("maphours: ")
            restaurantDetails.hours.map((object, i)=>{console.log(object.open)})
            //console.log(restaurantDetails.hours[0])
            restaurantDetails.hours.map((object, i) => 
            {
                console.log(object.open[0].day)
                // let today;
                // if (object.open.day === 6) {
                //     today = "Sunday"
                // } else if (object.open.day === 0) {
                //     today = "Monday"
                // } else if (object.open.day === 1) {
                //     today = "Tuesday"
                // } else if (object.open.day === 2) {
                //     today = "Wednesday"
                // } else if (object.open.day === 3) {
                //     today = "Thursday"
                // } else if (object.open.day === 4) {
                //     today = "Friday"
                // } else if (object.open.day === 5) {
                //     today = "Saturday"
                // }

                // return (
                //     <div key={i}>
                //         <h4>{today}</h4>
                //         <p>
                //             Open: {convertTime(object.start)}<br />
                //             Close: {convertTime(object.end)}<br />
                //         </p>
                //         <hr />
                //     </div>
                // )

            })
        }

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
                <Button className="" onClick={doThisStuff}>Hours</Button>
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