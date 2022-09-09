import React from 'react'
import './RestaurantThumbnail.css'

function RestaurantThumbnail(props) {


  return (
    <div className="restaurant--thumbnail" style={{backgroundImage: `url(${props.restaurant.image_url})`}}>

        <span className="restaurant--thumbnail-name">{props.restaurant.name} <button className="restaurant--thumbnail-button" onClick={(event) => props.removeRestaurant(props.restaurant.id)}>x</button></span>
    </div>
  )
}

export default RestaurantThumbnail