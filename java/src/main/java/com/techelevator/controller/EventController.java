package com.techelevator.controller;

import com.techelevator.business.EventService;
import com.techelevator.business.GuestService;
import com.techelevator.business.RestaurantService;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    GuestService guestService;

    //TODO: endpoint - GET all events by userId
    @GetMapping("/event/user/{userId}")
    public List<Event> getAllEventsByUserId(@PathVariable long userId) {
        return eventService.findAllEventsByUserId(userId);
    }

    //TODO: endpoint - GET event by eventId

    @GetMapping("/event/{eventId}")
    public Event getEventByEventId(@PathVariable long eventId) {
        return eventService.findByEventId(eventId);
    }

    //TODO: endpoint - POST new event

    @PostMapping("/event")
    public long createEvent(@RequestBody EventDTO eventDTO) {

        Event savedEvent = eventService.createNewEvent(eventDTO);

        restaurantService.saveRestaurantsToEvent(savedEvent, eventDTO);

        guestService.saveGuestsToEvent(savedEvent, eventDTO);

        return savedEvent.getEventId();
    }


    //TODO: endpoint - PUT? update event name/date/time?

    //TODO: endpoint - GET all guests by eventId
    @GetMapping("/event/{eventId}/guests")
    public List<Guest> getGuestsByEventId(@PathVariable long eventId) {
        return guestService.findAllGuestsByEventId(eventId);
    }

    //TODO: endpoint - GET all restaurants by eventId
    @GetMapping("/event/{eventId}/restaurants")
    public List<Restaurant> getRestaurantsByEventId(@PathVariable long eventId) {
        return restaurantService.findAllRestaurantsByEventId(eventId);
    }

    /* Might make Guest and Restaurant Controllers */

    //TODO: endpoint - PUT update guest when voted = true

    @GetMapping("/event/{eventId}/guests/{guestId}")
    public Guest getGuestByGuestId(@PathVariable long eventId, @PathVariable long guestId) {
        return guestService.findByGuestId(eventId, guestId);
    }


    //TODO: endpoint - PUT update restaurant when votes change

    @PostMapping("/vote")
    public void saveGuestVote(@RequestBody VoteDTO voteDTO) {
        Guest guest = guestService.findByGuestId(voteDTO.getEventId(), voteDTO.getGuestId());
        guest.setVoted(true);

        System.out.println(guest.getGuestId().getGuestId());
        System.out.println(voteDTO.getEventId());
        System.out.println(Arrays.toString(voteDTO.getRestaurantDTOs()));
        List<Restaurant> votedRestaurants = new ArrayList<>();

        for(RestaurantDTO restaurantDTO : voteDTO.getRestaurantDTOs()) {
            Restaurant restaurant = restaurantService.findByRestaurantId(voteDTO.getEventId(), restaurantDTO.getRestaurantId());
            if(restaurantDTO.isUpVoted()){
                restaurant.setUpVotes(restaurant.getUpVotes() + 1);
            } else if (restaurantDTO.isDownVoted()) {
                restaurant.setDownVotes(restaurant.getDownVotes() + 1);
            }
            votedRestaurants.add(restaurant);
        }

        guestService.updateGuest(guest);
        restaurantService.updateRestaurantVotes(votedRestaurants);

    }


}
