package com.techelevator.business;


import com.techelevator.dao.FavoriteRepository;
import com.techelevator.model.Favorite;
import com.techelevator.model.FavoriteId;
import com.techelevator.model.RestaurantDTO;
import com.techelevator.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    FavoriteRepository favoriteRepository;

    public List<Favorite> getFavoritesByUserId(long userId) {
        return favoriteRepository.findByFavoriteIdUserId(userId);
    }

    public Favorite getByFavoriteId(long userId, String restaurantId) {
        return favoriteRepository.findByFavoriteIdUserIdAndFavoriteIdRestaurantId(userId, restaurantId);
    }

    public Favorite saveFavorite(User user, RestaurantDTO restaurantDTO) {

        Favorite favorite = favoriteRepository.findByFavoriteIdUserIdAndFavoriteIdRestaurantId(user.getId(), restaurantDTO.getRestaurantId());
        System.out.println(restaurantDTO.isFavorite());
        System.out.println(user.getId());
        if (favorite == null) {
            favorite = new Favorite();
            favorite.setUser(user);
            favorite.setFavoriteId(new FavoriteId(user.getId(), restaurantDTO.getRestaurantId()));
            favorite.setRestaurantName(restaurantDTO.getRestaurantName());
            favorite.setImageUrl(restaurantDTO.getRestaurantImage());
            favorite.setFavorite(restaurantDTO.isFavorite());
        } else {
            favorite.setFavorite(restaurantDTO.isFavorite());
        }

        return favoriteRepository.save(favorite);
    }

}
