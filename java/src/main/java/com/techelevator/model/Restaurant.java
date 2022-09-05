package com.techelevator.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "event_restaurants")
public class Restaurant {

//    private long event_id;
//    private String restaurant_id;

    /* RestaurantID object refers to both event_id and restaurant_id */

    @EmbeddedId
    private RestaurantId restaurantId;

    @Column(name = "up_votes")
    private int upVotes;

    @Column(name="down_votes")
    private int downVotes;

    public Restaurant(RestaurantId restaurantId, int upVotes, int downVotes) {
        this.restaurantId = restaurantId;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Restaurant that = (Restaurant) o;
        return upVotes == that.upVotes && downVotes == that.downVotes && Objects.equals(restaurantId, that.restaurantId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(restaurantId, upVotes, downVotes);
    }
}
