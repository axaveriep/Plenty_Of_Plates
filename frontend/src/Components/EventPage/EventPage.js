import "./EventPage.css";
import { useState } from "react";
import RestaurantGrid from "../RestaurantGrid/RestaurantGrid";
import RestaurantThumbnail from "../RestaurantCard/RestaurantThumbnail";
import GuestForm from "../GuestForm/GuestForm"
import { Link } from "react-router-dom";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";

const Swal = window.Swal;

export default function EventPage(props) {

  const [eventTitle, setEventTitle] = useState("Event Title");

  const [eventDate, setEventDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [eventTime, setEventTime] = useState();

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const [selectedGuests, setSelectedGuests] = useState([]);

  /** brings userId of logged in user from redux state */
  const userId = useSelector((state) => state.user.id);

  /** saves event title to state when user presses enter key on input */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEventTitle(event.target.textContent);
    }
  };

  /** adds restaurants to state when selected by user -
   * function passed to Restaurant Grid/Card
  */
  function selectRestaurant(restaurant) {
    setSelectedRestaurants((prevSelectedRestaurants) => {
      return [...prevSelectedRestaurants, restaurant];
    });
  }

  /** removes restaurants from state when user presses X button -
   * function passed to Restaurant Thumbnail
   */
  function removeRestaurant(id) {
    setSelectedRestaurants((prevSelectedRestaurants) => {
      return prevSelectedRestaurants.filter(
        (restaurant) => restaurant.id !== id
      );
    });
  }

  /** maps chosen restaurants to thumnails to be displayed on page */
  let restaurantThumbnails = selectedRestaurants.map((restaurant, i) => {
    return (
      <RestaurantThumbnail
        key={i}
        restaurant={restaurant}
        removeRestaurant={removeRestaurant}
      />
    );
  });

  function addGuests(guests) {
    setSelectedGuests(guests)
  }


  /** saves all event information to database */
  function handleSubmit(event) {
    const selectedRestaurantsID = selectedRestaurants.map((restaurant) => {
      return restaurant.id;
    });

    const selectedGuestIDs = selectedGuests.map((guest) =>{ 
      return guest.id;
    })

    console.log(selectedGuestIDs);

    event.preventDefault();
    const data = {
      userId: userId,
      restaurantIds: selectedRestaurantsID,
      guestIds: selectedGuestIDs,
      date: eventDate,
      title: eventTitle,
      time: eventTime
    };

    console.log(data);
    
    axios
      .post(baseUrl + "/event", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1
        contentEditable="true"
        className="event--title"
        onKeyDown={handleKeyDown}
        onBlur={(e) => setEventTitle(e.currentTarget.textContent)}
      >
        {eventTitle}
      </h1>
      <input
        type="date"
        name="event--date"
        defaultValue={eventDate}
        value={eventDate}
        onChange={(e) => setEventDate(e.currentTarget.value)}
      />
      <br />
      <input
        type="time"
        name="event--time"
        value={eventTime}
        onChange={(e) => setEventTime(e.currentTarget.value)}
      />
      <br />
      <RestaurantGrid selectRestaurant={selectRestaurant} hideAddBtn={false} hideRemoveBtn={true} />
      <div className="event--selectedRestuarants">{restaurantThumbnails}</div>
      <GuestForm addGuests={addGuests} />
      <div className="event--selectedRestuarants">
        {selectedGuests.map((guest, i) => {
          return (<h5 key={i}>
            {guest.name}
          </h5>)
        })}<br />
        {console.log(selectedGuests)}
      </div>
      <button className="btn" type="submit" onClick={handleSubmit}>
        Submit event!
      </button>
    </div>
  );
}
