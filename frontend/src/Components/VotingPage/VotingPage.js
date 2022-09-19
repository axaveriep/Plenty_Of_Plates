import React, { useState, useEffect } from 'react'
import { baseUrl } from '../../Shared/baseUrl';
import './VotingPage.css'
import { useParams } from "react-router-dom"
import { 
  getEventByEventId, 
  getGuestByEventIdAndGuestId, 
  getRestaurantById 
} from '../SearchBar/SearchFunctions';
import {
  Carousel,  CarouselItem,  CarouselControl,  CarouselCaption,
  ButtonGroup,  Button, 
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import axios from 'axios';

function VotingPage() {

  let { eventId, guestId } = useParams();

  const [event, setEvent] = useState();
  const [guest, setGuest] = useState();
  const [restaurantDTOs, setRestaurantDTOs] = useState();
  const [restaurantDetails, setRestaurantDetails] = useState();

  const [modal, setModal] = useState(false);

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

  useEffect(() => {

    Promise.resolve(getEventByEventId(eventId))
      .then(value => {
        setEvent(value)
      })

    Promise.resolve(getGuestByEventIdAndGuestId(eventId, guestId))
      .then(value => {
        setGuest(value)
      })


  }, [eventId, guestId])

  console.log(event)
  console.log(guest)

  useEffect(() => {
    if (event !== undefined) {
      setItems(event.restaurantList)
      setRestaurantDTOs(() => {
        return event.restaurantList.map((restaurant) => {
          return {
            restaurantId: restaurant.restaurantId.restaurantId,
            upVoted: false,
            downVoted: false
          }
        })
      })
    }

  }, [event])


  function getRestaurantDetails(restaurantId) {
    console.log(restaurantId)
    let result = getRestaurantById(restaurantId)
    console.log(result)
    Promise.resolve(result)
      .then(value => {
        console.log(value)
        setRestaurantDetails(value)
      })

    setModal(!modal)
  }

  console.log(restaurantDTOs)
  console.log(restaurantDetails)

  function changeVote(restaurantId, n) {
    setRestaurantDTOs(prevDTOs => {
      return prevDTOs.map((current) => {
        if (current.restaurantId === restaurantId) {
          if (n === 1) {
            return { ...current, upVoted: true, downVoted: false }
          } else if (n === 2) {
            return { ...current, upVoted: false, downVoted: true }
          } else return current
        } else return current
      })
    })
  }

  function submitVote(e) {
    
    e.preventDefault();
    console.log("clicked!")

    const data = {
      eventId: eventId,
      guestId: guestId,
      restaurantDTOs: restaurantDTOs
    }

    console.log(data)

    axios
    .post(baseUrl + '/vote', data)
    .then(response => console.log(response))
    .catch(error => console.log(error))

  }

  return (
    <div>{event !== undefined && guest !== undefined && !guest.voted ?
      <div>
        <h1>Hello {guest.guestName}!</h1>
        <h2>You've been invited to {event.title} on {event.time}.</h2>
        <h3>Vote on where you'd like to go!</h3>
        <div className='voting--restaurant-thumbnail-container'>

          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={false}
            className='voting--carousel'
          >

            {event.restaurantList.map((restaurant, i) => {

              return (
                <CarouselItem
                  onExiting={() => setAnimating(true)}
                  onExited={() => setAnimating(false)}
                  key={i}
                  id={restaurant.restaurantId.restaurantId}
                  tag="div"
                  className='voting--carousel-item'
                >
                  <img src={restaurant.image_url} alt={restaurant.name}
                    className='voting--carousel-image' />

                  <CarouselCaption
                    captionHeader={restaurant.name}
                    captionText={
                      <div className='voting--carousel-btns'>
                        <p>
                          <Button
                            id="Popover1"
                            type="button"
                            onClick={() => getRestaurantDetails(restaurantDTOs[i].restaurantId)}
                          >
                            Restaurant Details
                          </Button>
                          <Modal
                            isOpen={modal}
                            toggle={() => getRestaurantDetails(restaurantDTOs[i].restaurantId)}
                          >
                            {restaurantDetails !== undefined &&
                              <ModalHeader>
                                {restaurantDetails.name}
                              </ModalHeader>}
                            {restaurantDetails !== undefined &&
                              <ModalBody>
                                <RestaurantCard
                                  restaurant={restaurantDetails}
                                  hideAddBtn={true}
                                />
                              </ModalBody>}
                            <ModalFooter>
                              <button
                                className="modal-okayBtn"
                                onClick={() => setModal(false)}
                              >
                                Okay
                              </button>
                            </ModalFooter>
                          </Modal>
                        </p>

                        <ButtonGroup>
                          <Button
                            color="success"
                            active={restaurantDTOs !== undefined
                              && restaurantDTOs[i].upVoted === true
                            }
                            onClick={() => changeVote(restaurant.restaurantId.restaurantId, 1)}
                          >
                            Yes
                          </Button>
                          <Button
                            color="danger"
                            active={restaurantDTOs !== undefined
                              && restaurantDTOs[i].downVoted === true
                            }
                            onClick={() => changeVote(restaurant.restaurantId.restaurantId, 2)}
                          >
                            No
                          </Button>
                        </ButtonGroup>
                      </div>}
                    className='voting--carousel-item-caption'
                  />

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
        <form onSubmit={(e) => submitVote(e)}>
        <button type="submit" onCLick={submitVote}>Submit Votes</button>
        </form>
      </div>
      : event !== undefined && guest !== undefined && guest.voted ?
      <><h1>Thank you for voting!</h1></>
      : 
      <></>
    }
    </div>
  )
}

export default VotingPage