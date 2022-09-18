import "./EventPage.css";
import { useEffect, useState } from "react";
import RestaurantGrid from "../RestaurantGrid/RestaurantGrid";
import RestaurantThumbnail from "../RestaurantCard/RestaurantThumbnail";
import GuestForm from "../GuestForm/GuestForm"
import { Link } from "react-router-dom";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from 'reactstrap'

const Swal = window.Swal;

export default function EventPage(props) {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  const [guestModal, setGuestModal] = useState(false);

  const toggleGuest = () => setGuestModal(!guestModal);

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
  const user = useSelector((state) => state.user);

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
    <div className="event--container">
      {!eventCreated ?
      <div>
        <h1
          contentEditable="true"
          className="event--title"
          onKeyDown={handleKeyDown}
          onBlur={(e) => setEventTitle(e.currentTarget.textContent)}
        >
        {eventTitle}
        </h1>
        {/*Add Edit Pencil Icon*/}
        <div className="event--time-container">
          <h5>When:</h5>
        <input
          type="date"
          name="event--date"
          id="event--date"
          min={minEventDate.toISOString().slice(0, 10)}
          defaultValue={eventDate}
          value={eventDate}
          onChange={(e) => setEventDate(e.currentTarget.value)}
        />
        <h5>at:</h5>
        <input
          type="time"
          name="event--time"
          id="event--time"
          value={eventTime}
          onChange={(e) => setEventTime(e.currentTarget.value)}
        />
        <h5>Deadline:</h5>
        <input
          type="date"
          name="event--deadline"
          id="event--deadline"
          min={minEventDeadline.toISOString().slice(0, 10)}
          max={maxEventDeadline.toISOString().slice(0, 10)}
          defaultValue={eventDeadline}
          value={eventDeadline}
          onChange={(e) => setEventDeadline(e.currentTarget.value)}
        />
        </div>
          <div className="event--restaurants-container">
            <Button onClick={toggle} className="event-searchBtn">Search Restaurants</Button>
            <RestaurantGrid 
              selectRestaurant={selectRestaurant}
              hideAddBtn={false} 
              modal={modal} 
              toggle={toggle}
            />
            {restaurantThumbnails.length != 0?
              <div className="event--selectedRestuarants">
                {restaurantThumbnails}
              </div>
            :
              <></>
            }
          </div>

          <div className="event--guests-container">
          <Button onClick={toggleGuest} className="event-guestBtn">Invite Guests</Button>
            <GuestForm 
              addGuests={addGuests} 
              modal={guestModal} 
              toggle={toggleGuest}/>
            {selectedGuests.length >=1 ?
              <div className="event--selectedRestuarants">
                {
                  selectedGuests.map((guest, i) => {
                  return (<h5 key={i}> {guest.name} </h5>)})
                }
              </div>
            :
              <></>
            }
        </div>

        {restaurantThumbnails.length != 0 && selectedGuests.length >=1 ?
        <div className="event--submit-container">
          <Button type="submit" onClick={handleSubmit} className="event-submitBtn">
            Submit event!
          </Button>
        </div>
        :
        <></>
        }
      </div>

    :

    <div>
      <h1>Event Created!</h1>
      <div className='event--title'>{eventTitle}</div>
      <div className='event--date-time'>{eventDate} at {eventTime}</div>
      <div className="event--confirmed-selectedGuests">
        {selectedGuests.map((guest, i) => {
          return (
            <div key={i} className="event--confirmed-guest">
            <label>{guest.name}</label>
            <input id="input--eventLink" type='text' readOnly={true} value={`localhost:3000/vote/${eventId}/${guest.id}`} />
            <button onClick={()=> navigator.clipboard.writeText(`localhost:3000/vote/${eventId}/${guest.id}`)}>Copy</button>
            {guest.email==="" ? <></> : <button><a href={`mailto:${guest.email}?&subject=${user.username} has invited you out!&body=Click this link localhost:3000/vote/${eventId}/${guest.id}`}>E-mail Link</a></button>}
            </div>)
          })
        }
        <br />
        </div>
        <div className="event--selectedRestuarantsSubmited">
          {restaurantThumbnails}
        </div>
        <Button type="submit">GO TO EVENT</Button>
      </div>
      }
    </div>
  );
}
