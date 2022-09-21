import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar"
import RestaurantCard from "../RestaurantCard/RestaurantCard"
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import "./RestaurantGrid.css"
import { useEffect } from "react";
import { getFavoritesByUserId } from "../SearchBar/SearchFunctions";

export default function RestaurantGrid(props) {

    const user = useSelector((state) => state.user)
    console.log(user)

    // const [favorites, setFavorites] = useState(user.favorites)
    console.log(props.favorites)

    // const[favCount, setFavCount] = useState(0);

    const [restaurants, setRestaurants] = useState([])

    // useEffect(() => {
    //     Promise.resolve(getFavoritesByUserId(user.id))
    //     .then(value => setFavorites(value))
    // }, [favCount])

    async function addRestaurants(restaurantsArray) {

        Promise.resolve(restaurantsArray).then(value => {
            if(value !== undefined) {
                setRestaurants(value)
            }
        })
    }

    // function removeRestaurant(event, id) {

    //     for (const restaurant of restaurants) {
    //         if (restaurant.id === id) {
    //             removeItem(restaurants.indexOf(restaurant))
    //         }
    //     }
    // }

    // function removeItem(index) {
    //     setRestaurants(restaurants.filter((o, i) => index !== i));
    // };



    let displayedRestaurants = restaurants.map((restaurant, i) => {
        let thisFavorite = false
        if(props.favorites !== undefined){
        props.favorites.forEach((fav) => {
            if(fav.favoriteId.restaurantId === restaurant.id){
                thisFavorite = fav.favorite
            }
        })}

        console.log(restaurant.name + " " + thisFavorite)

        return (<RestaurantCard 
            key={i} 
            index={i}
            restaurant={restaurant} 
            // removeRestaurant={removeRestaurant} 
            selectRestaurant={props.selectRestaurant} 
            selectedRestaurants={props.selectedRestaurants}
            addFavorite={props.addFavorite}
            userId={user.id}
            hideAddBtn={props.hideAddBtn} 
            isFavorite={thisFavorite}
            />)
    })


    // const [modal, setModal] = React.useState(false);

    // const toggle = () => setModal(!modal);

    return (

        <div>
            {/* <Button
                onClick={toggle}>Search Restaurants
            </Button> */}

            <Modal isOpen={props.modal} toggle={props.toggle} className="modal-dialog" scrollable={true} >
                <ModalHeader toggle={props.toggle} className="header">
                    <div className="restaurant--grid-title">
                        Restaurants
                    </div>
                    <div className="restaurant--grid-subtitle">
                        in
                    </div>
                    <SearchBar
                        searchType={'RESTAURANTS_LOCATION'}
                        addRestaurants={addRestaurants}
                        placeholder="Enter a Location or Zip Code"
                    />
                </ModalHeader>
                <ModalBody className="modal-body">
                    <div className="restaurant--grid-display">
                        {displayedRestaurants}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="modal-okayBtn" onClick={props.toggle}>Okay</button>
                </ModalFooter>
            </Modal>
        </div >
    )
}