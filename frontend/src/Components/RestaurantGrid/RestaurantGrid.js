import React, { useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import RestaurantCard from "../RestaurantCard/RestaurantCard"
import { Button, Modal, ModalFooter,ModalHeader, ModalBody, Container, Row, Col } from "reactstrap"
import "./RestaurantGrid.css"

export default function RestaurantGrid(props) {

    const [restaurants, setRestaurants] = useState([])

    async function addRestaurants(restaurantsArray) {
        Promise.resolve(restaurantsArray).then(value => {
            setRestaurants(value)
        })

        console.log(restaurants)
        // let restaurantsReturned = await Promise.all(restaurantsArray)

        // console.log(restaurantsReturned)

        // setRestaurants(prevRestaurants => {
        //     return [...prevRestaurants, restaurantsReturned]
        // })
    }

    function removeRestaurant(event, id){
        //setRestaurants({restaurants: restaurants.filter(function(restaurant) 
        //    { return restaurant.id !== id })});
        for (const restaurant of restaurants)
        {
            if (restaurant.id === id)
            {
                removeItem(restaurants.indexOf(restaurant))
            }
        }
    }

    function removeItem(index){
        setRestaurants(restaurants.filter((o, i) => index !== i));
    };

    let displayedRestaurants = restaurants.map((restaurant, i) => {
        return (<RestaurantCard key={i} restaurant={restaurant} removeRestaurant={removeRestaurant}/>)
    })


    const [modal, setModal] = React.useState(false);

    const toggle = () => setModal(!modal);

    return(
  
        <div>
            <Button
                onClick={toggle}>View Restaurants
            </Button>

            <Modal isOpen={modal} toggle={toggle} className="modal-dialog" scrollable={true} >
                <ModalHeader toggle={toggle} className="header">
                    Restaurants
                </ModalHeader>
                <ModalBody className="modal-body">
                    <SearchBar 
                    searchType={'RESTAURANTS_LOCATION'} 
                    addRestaurants={addRestaurants}
                    />
                    <Container>
                        <Col>
                            <Row>

                            </Row>
                        </Col>
                    </Container>
                    {displayedRestaurants}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>Okay</Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}