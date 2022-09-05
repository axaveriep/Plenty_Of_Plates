package com.techelevator.model;


public class RestaurantDTO {

    private long eventId;

    private String restaurantId;

    private int upVotes;

    private int downVotes;


    //<editor-fold desc="Constructors, Getters, Setters">
    public RestaurantDTO() {}

    public RestaurantDTO(long eventId, String restaurantId, int upVotes, int downVotes) {
        this.eventId = eventId;
        this.restaurantId = restaurantId;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }

    public long getEventId() {
        return eventId;
    }

    public void setEventId(long eventId) {
        this.eventId = eventId;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public int getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(int upVotes) {
        this.upVotes = upVotes;
    }

    public int getDownVotes() {
        return downVotes;
    }

    public void setDownVotes(int downVotes) {
        this.downVotes = downVotes;
    }
    //</editor-fold>


}
