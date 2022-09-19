import React, { useState, useEffect } from 'react'
import './VotingPage.css'
import { useParams } from "react-router-dom"
import { getEventByEventId, getGuestByEventIdAndGuestId, getGuestByGuestId, getRestaurantById } from '../SearchBar/SearchFunctions';
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  ButtonGroup,
  Button, Modal, ModalHeader, ModalBody,
  UncontrolledPopover, PopoverHeader, PopoverBody, ModalFooter
} from 'reactstrap';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

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

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
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
    // setSelectedButton(n);
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


  return (
    <div>{event !== undefined && guest !== undefined ?
      <div>
        {/* <h1>Event ID: {eventId}</h1>
        <h2>Event Name: {event.title}</h2>
        <h1>Guest ID: {guestId}</h1> */}
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
            {/* <CarouselIndicators
              items={event.restaurantList}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            /> */}

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
                        {/* <button>yes</button>
                        
                        <button>no</button> */}
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

      </div>
      :
      <></>
    }
    </div>
  )
}

export default VotingPage