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
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal])

    const toggle = () => 
    {
        if(restaurantDetails.hours !== undefined)
        {
            setModal(!modal)
            let resthours = restaurantDetails.hours[0].open.map((object, i) => 
            {
                return (<RestaurantHours key={i} object={object} />)
            })
            setHours(resthours)
        }
    }

    return (
        <div>
            <div className="restaurant--container">
                <div className='restaurant--name'>{props.restaurant.name}</div>
                <div className='restaurant--type'>{categoryTitles}</div>
                <address className='restaurant--address'>{props.restaurant.location.display_address}
                    {/** adjust display address to not show on one line */}</address>
                <p><a href={"tel:"+props.restaurant.display_phone}>{props.restaurant.display_phone}</a></p>
                <img className='restaurant--image' src={props.restaurant.image_url} alt="restaurant visual"/>

                <Button className="" onClick={toggle}>Hours</Button> {/*disabled={restaurantDetails.hours === undefined}*/}

                <Modal isOpen={modal} toggle={toggle} className="modal-dialog" scrollable={true}>
                    <ModalHeader className="header">
                        {props.restaurant.name} Hours <br />
                        {restaurantDetails.hours === undefined ? '' : restaurantDetails.hours[0].is_open_now ? <span className="badge open">Open Now</span> : <span className="badge closed">Closed</span>}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        {hours === undefined ? <></> : <>{hours}</>}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={toggle}>Okay</Button>
                    </ModalFooter>
                </Modal>
                <div className="rating">Rating: {props.restaurant.rating}{/*TODO: Add visuals*/}</div>
                <div className="restaurant--buttons">
                    <button className="restaurant--favoriteBtn">{/*TODO: Add functionality*/}Add to Favorites</button>
                    {props.hideAddBtn ? <></> : <button className="restaurant--addBtn" onClick={() => props.selectRestaurant(props.restaurant)}>Add To Event</button>}
                    {props.hideRemoveBtn ? <></> : <button className="restaurant--removeBtn" onClick={(event) => props.removeRestaurant(event, props.restaurant.id)}>X</button>}
                </div>
            </div>
        </div>
    )
}