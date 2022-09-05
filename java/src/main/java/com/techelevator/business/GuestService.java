package com.techelevator.business;

import com.techelevator.dao.GuestRepository;
import com.techelevator.model.Guest;
import com.techelevator.model.GuestDTO;
import com.techelevator.model.GuestId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {

    @Autowired
    GuestRepository guestRepository;


    public List<Guest> findAllGuestsByEventId(long eventId) {
        return guestRepository.findByGuestIdEventId(eventId);
    }

    public void saveGuestToEvent(GuestDTO guestDTO) {
        Guest newGuest = new Guest();
        newGuest.setGuestId(new GuestId(guestDTO.getEvent_id(), guestDTO.getGuest_id()));
        guestRepository.save(newGuest);
    }


}
