package com.techelevator.model;

import java.sql.Timestamp;

public class EventDTO {

    private long userId;
    private String[] restaurantIds;
    private String title;
    private String date;
    private String time;

    public EventDTO() {}

    public EventDTO(long userId, String[] restaurantIds, String title, String date, String time) {
        this.userId = userId;
        this.restaurantIds = restaurantIds;
        this.title = title;
        this.date = date;
        this.time = time;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String[] getRestaurantIds() {
        return restaurantIds;
    }

    public void setRestaurantIds(String[] restaurantIds) {
        this.restaurantIds = restaurantIds;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
