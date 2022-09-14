package com.techelevator.business;

import com.techelevator.dao.GuestRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestService {

    @Autowired
    GuestRepository guestRepository;


    public List<Guest> findAllGuestsByEventId(long eventId) {
        return guestRepository.findByGuestIdEventId(eventId);
    }

    public void saveGuestsToEvent(Event savedEvent, EventDTO eventDTO) {
        List<Guest> invitedGuests = new ArrayList<>();

        for(Long guestId : eventDTO.getGuestIds()) {
            Guest newGuest = new Guest(new GuestId(savedEvent.getEventId(), guestId), false);
            invitedGuests.add(newGuest);
        }

        guestRepository.saveAll(invitedGuests);
    }


}
