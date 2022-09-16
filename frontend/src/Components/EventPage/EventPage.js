import "./EventPage.css";
import { useEffect, useState } from "react";
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

  const currentDate = new Date().toISOString().slice(0, 10)
  let minEventDate = new Date(currentDate)
  minEventDate.setDate(minEventDate.getDate() + 5)

  const [eventDate, setEventDate] = useState(minEventDate.toISOString().slice(0, 10)
  );

  let maxEventDeadline = new Date(eventDate)
  maxEventDeadline.setDate(maxEventDeadline.getDate() - 2)

  let minEventDeadline = new Date(currentDate)
  minEventDeadline.setDate(minEventDeadline.getDate() + 2)

  const [eventDeadline, setEventDeadline] = useState(maxEventDeadline.toISOString().slice(0, 10))


  const [eventTime, setEventTime] = useState();

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const [selectedGuests, setSelectedGuests] = useState([]);

  const [eventCreated, setEventCreated] = useState(false);

  const [eventId, setEventId] = useState();

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
        eventCreated={eventCreated}
      />
    );
  });



  function addGuests(guests) {
    setSelectedGuests(guests)
  }


  /** saves all event information to database */
  function handleSubmit(event) {
    // const selectedRestaurantsID = selectedRestaurants.map((restaurant) => {
    //   return restaurant.id;
    // });

    const selectedRestaurantDTOs = selectedRestaurants.map((restaurant) => {
      return (
        {
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantImage: restaurant.image_url
        }
      )
    })

    const selectedGuestDTOs = selectedGuests.map((guest) => {
      return ({
        guest_name: guest.name,
        guest_id: guest.id
      });
    })

    console.log(selectedGuestDTOs);

    event.preventDefault();
    const data = {
      userId: userId,
      //restaurantIds: selectedRestaurantsID,
      restaurantDTOs: selectedRestaurantDTOs,
      guestDTOs: selectedGuestDTOs,
      date: eventDate,
      deadline: eventDeadline,
      title: eventTitle,
      time: eventTime
    };

    console.log(data);

    axios
      .post(baseUrl + "/event", data)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setEventId(response.data)
          setEventCreated(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <div className="container">
      {eventCreated ?
        <div>
          <h1>Event Created!</h1>
          <div className='event--title'>{eventTitle}</div>
          <div className='event--date-time'>{eventDate} at {eventTime}</div>
          <div className="event--confirmed-selectedGuests">
            {selectedGuests.map((guest, i) => {
              return (<div key={i} className="event--confirmed-guest">
                <label>{guest.name}</label>
                <input type='text' readOnly={true} value={`localhost:3000/${eventId}/${guest.id}`} />
                <button>copy</button><button>e-mail link</button>
              </div>)
            })}<br />
          </div>
          <div className="event--selectedRestuarantsSubmited">{restaurantThumbnails}</div>
          <button className="btn" type="submit">GO TO EVENT</button>
        </div>

        :
        <div>
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
            min={minEventDate.toISOString().slice(0, 10)}
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
          <RestaurantGrid selectRestaurant={selectRestaurant} hideAddBtn={false}/>
          <div className="event--selectedRestuarants">{restaurantThumbnails}</div>
          <GuestForm addGuests={addGuests} />
          <div className="event--selectedRestuarants">
            {selectedGuests.map((guest, i) => {
              return (<h5 key={i}>
                {guest.name}
              </h5>)
            })}<br />
          </div>
          <input
            type="date"
            min={minEventDeadline.toISOString().slice(0, 10)}
            max={maxEventDeadline.toISOString().slice(0, 10)}
            name="event--deadline"
            defaultValue={eventDeadline}
            value={eventDeadline}
            onChange={(e) => setEventDeadline(e.currentTarget.value)}
          />
          <button className="btn" type="submit" onClick={handleSubmit}>
            Submit event!
          </button>
        </div>
      }
    </div>
  );
}
