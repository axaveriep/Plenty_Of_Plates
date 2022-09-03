package com.techelevator.model;

import java.sql.Time;
import java.sql.Date;

public class Event {

    private Long event_id;
    private String event_name;
    private Date date;
    private Time time;

    public Event() {}

    public Event(Long invite_id, Date date, Time time) {
        this.event_id = invite_id;
        this.date = date;
        this.time = time;
    }


    public Long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Long event_id) {
        this.event_id = event_id;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

}
