package com.techelevator.business;

import com.techelevator.dao.RestaurantRepository;
import com.techelevator.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    public void saveRestaurantsToEvent(Event savedEvent, EventDTO eventDTO) {
        List<Restaurant> savedRestaurants = new ArrayList<>();

        for(String restaurantId : eventDTO.getRestaurantIds()) {
            Restaurant restaurant = new Restaurant(new RestaurantId(savedEvent.getEventId(), restaurantId), 0, 0);
            // note: the 0s right now represent initial upVotes and downVotes - remove magic numbers later
            savedRestaurants.add(restaurant);
        }

        restaurantRepository.saveAll(savedRestaurants);
    }

    public List<Restaurant> findAllRestaurantsByEventId(long eventId) {
        return restaurantRepository.findByRestaurantIdEventId(eventId);
    }


}
