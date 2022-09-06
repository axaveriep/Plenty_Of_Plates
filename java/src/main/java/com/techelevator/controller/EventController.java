package com.techelevator.controller;

import com.techelevator.business.EventService;
import com.techelevator.dao.EventRepository;
import com.techelevator.model.Event;
import com.techelevator.model.EventDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;

@RestController
@CrossOrigin
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    EventService eventService;

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
        newEvent.setDate(LocalDate.parse(eventDTO.getDate()));
        newEvent.setTime(new Timestamp(System.currentTimeMillis()));
        eventRepository.save(newEvent);
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
