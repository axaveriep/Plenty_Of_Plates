import React, { useState, useEffect } from 'react'
import './VotingPage.css'
import { useParams } from "react-router-dom"
import { getEventByEventId, getGuestByGuestId } from '../SearchBar/SearchFunctions';
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

function VotingPage() {


  let { eventId, guestId } = useParams();

  const [event, setEvent] = useState();
  const [guest, setGuest] = useState();

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };


  useEffect(() => {

    Promise.resolve(getEventByEventId(eventId))
      .then(value => {
        setEvent(value)
      })

      
    Promise.resolve(getGuestByGuestId(guestId))
      .then(value => {
        setGuest(value)
      })

      // window.location.reload(false)

  }, [eventId, guestId])

  console.log(event)
  console.log(guest)

  useEffect(() => {
    if (event !== undefined) { setItems(event.restaurantList) }
  }, [event])

  return (
    <div>{event !== undefined && guest !== undefined ?
      <div>
        <h1>Event ID: {eventId}</h1>
        <h2>Event Name: {event.title}</h2>
        <h1>Guest ID: {guestId}</h1>
        <h2>Guest Name: {guest.guestName}</h2>
        <div className='voting--restaurant-thumbnail-container'>
          {/* {event.restaurantList.map((restaurant, i) => {
            return (
              <RestaurantThumbnail
                key={i}
                restaurant={restaurant}
                eventCreated={true}
              />
            );
          })} */}
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
            className='voting--carousel'
          >
            <CarouselIndicators
              items={event.restaurantList}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {event.restaurantList.map((restaurant) => {
              return (
                
                <CarouselItem
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={restaurant.restaurantId.restaurantId}
                  className='voting--carousel-item'
                >
                  <img src={restaurant.image_url} alt={restaurant.name} 
                  className='voting--carousel-image'/>
                  
                  <CarouselCaption
                    captionHeader={restaurant.name}
                    className='voting--carousel-item-caption'
                  />
                  <div className='voting--carousel-btns'><button>yes</button><button>no</button></div>
                </CarouselItem>
                
                
              )
            })}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction='next'
              directionText='Next'
              onClickHandler={next}
            />
          </Carousel>
        </div>

      </div>
      :
      <></>
    }
    </div>
  )
}

export default VotingPage