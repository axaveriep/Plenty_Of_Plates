package com.techelevator.business;

import com.techelevator.dao.RestaurantRepository;
import com.techelevator.model.Restaurant;
import com.techelevator.model.RestaurantDTO;
import com.techelevator.model.RestaurantId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;

    public void saveRestaurantToEvent(RestaurantDTO restaurantDTO) {
        Restaurant newRestaurant = new Restaurant();
        newRestaurant.setRestaurantId(new RestaurantId(restaurantDTO.getEventId(), restaurantDTO.getRestaurantId()));
        newRestaurant.setUpVotes(restaurantDTO.getUpVotes());
        newRestaurant.setDownVotes(restaurantDTO.getDownVotes());
        restaurantRepository.save(newRestaurant);
    }

    public List<Restaurant> findAllRestaurantsByEventId(long eventId) {
        return restaurantRepository.findByRestaurantIdEventId(eventId);
    }


}
