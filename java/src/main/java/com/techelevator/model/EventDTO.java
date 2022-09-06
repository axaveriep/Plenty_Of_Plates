package com.techelevator.model;

public class EventDTO {

    private long userId;
    private String date;
    private String time;

    public EventDTO() {}

    public EventDTO(int userId, String date, String time) {
        this.userId = userId;
        this.date = date;
        this.time = time;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
