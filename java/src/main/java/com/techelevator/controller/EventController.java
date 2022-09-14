package com.techelevator.controller;

import com.techelevator.business.EventService;
import com.techelevator.business.GuestService;
import com.techelevator.business.RestaurantService;
import com.techelevator.dao.EventRepository;
import com.techelevator.dao.RestaurantRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
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
    public void createEvent(@RequestBody EventDTO eventDTO) {

        Event savedEvent = eventService.createNewEvent(eventDTO);

        restaurantService.saveRestaurantsToEvent(savedEvent, eventDTO);

        guestService.saveGuestsToEvent(savedEvent, eventDTO);
    }

    //TODO: endpoint - POST save each guest with eventID
    // default: voted = false


    //TODO: endpoint - POST save each restaurant with eventID
    // default: upVotes = 0, downVotes = 0

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


    //TODO: endpoint - PUT update restaurant when votes change




}
