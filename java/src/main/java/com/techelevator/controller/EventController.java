package com.techelevator.controller;

import com.techelevator.business.EventService;
import com.techelevator.dao.EventRepository;
import com.techelevator.dao.RestaurantRepository;
import com.techelevator.model.Event;
import com.techelevator.model.EventDTO;
import com.techelevator.model.Restaurant;
import com.techelevator.model.RestaurantId;
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
    EventRepository eventRepository;

    @Autowired
    EventService eventService;

    @Autowired
    RestaurantRepository restaurantRepository;

    //TODO: endpoint - GET all events by userId

    //TODO: endpoint - GET event by eventId

    @GetMapping("/event/{id}")
    public Event getEvent(@PathVariable long id) {
        return eventService.findByEventId(id);
    }

    //TODO: endpoint - POST new event

    @PostMapping("/event")
    public void createEvent(@RequestBody EventDTO eventDTO) {
        Event newEvent = new Event();
        newEvent.setUserId(eventDTO.getUserId());
        newEvent.setTitle(eventDTO.getTitle());
        newEvent.setDate(LocalDate.parse(eventDTO.getDate()));
        newEvent.setTime(Timestamp.valueOf(eventDTO.getDate() + " " + eventDTO.getTime() + ":00"));

        Event savedEvent = eventRepository.save(newEvent);
        List<Restaurant> savedRestaurants = new ArrayList<>();

        for(String restaurantId : eventDTO.getRestaurantIds()) {
            Restaurant restaurant = new Restaurant(new RestaurantId(savedEvent.getEventId(), restaurantId), 0, 0);
            // note: the 0s right now represent initial upVotes and downVotes - remove magic numbers later
            savedRestaurants.add(restaurant);
        }

        restaurantRepository.saveAll(savedRestaurants);

    }

    //TODO: endpoint - POST save each guest with eventID
    // default: voted = false

    //TODO: endpoint - POST save each restaurant with eventID
    // default: upVotes = 0, downVotes = 0

    //TODO: endpoint - PUT? update event name/date/time?

    //TODO: endpoint - GET all guests by eventId

    //TODO: endpoint - GET all restaurants by eventId

    /* Might make Guest and Restaurant Controllers */

    //TODO: endpoint - PUT update guest when voted = true

    //TODO: endpoint - PUT update restaurant when votes change




}
