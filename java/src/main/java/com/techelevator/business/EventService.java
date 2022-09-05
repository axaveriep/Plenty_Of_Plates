package com.techelevator.business;

import com.techelevator.dao.EventRepository;
import com.techelevator.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public Event findByEventId(long eventId) {
        return eventRepository.findById(eventId);
    }

    public List<Event> findAllEventsByUserId(long userId) {
        return eventRepository.findAllByUserId(userId);
    }
}
