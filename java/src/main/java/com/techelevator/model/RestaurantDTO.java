package com.techelevator.model;


public class RestaurantDTO {

    private String restaurantId;

    private String restaurantName;

    private String restaurantImage;


    //<editor-fold desc="Constructors, Getters, Setters">
    public RestaurantDTO() {}

    public RestaurantDTO(String restaurantId, String restaurantName, String restaurantImage) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantImage = restaurantImage;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantImage() {
        return restaurantImage;
    }

    public void setRestaurantImage(String restaurantImage) {
        this.restaurantImage = restaurantImage;
    }

    //</editor-fold>


}
