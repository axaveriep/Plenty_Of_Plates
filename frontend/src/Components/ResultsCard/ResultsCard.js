import React from 'react'
import "./ResultsCard.css"


export default function ResultsCard(props) {
    return (
        <div className="restaurant--thumbnail">
                <img className="restaurant--thumbnail-image" src={props.restaurant.image_url} alt="small thumbnail of restaurant"/>
                <><span className="text">{props.restaurant.name}</span></>
                <div>
                    {props.restaurant.upVotes}
                </div>
                <div>
                    {props.restaurant.downVotes}
                </div>
        </div>
      )
}