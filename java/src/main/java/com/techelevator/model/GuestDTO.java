package com.techelevator.model;


public class GuestDTO {

    private long event_id;

    private long guest_id;

    private boolean voted;


    //<editor-fold desc="Constructors, Getters, Setters">
    public GuestDTO() {}

    public GuestDTO(long event_id, long guest_id, boolean voted) {
        this.event_id = event_id;
        this.guest_id = guest_id;
        this.voted = voted;
    }

    public long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(long event_id) {
        this.event_id = event_id;
    }

    public long getGuest_id() {
        return guest_id;
    }

    public void setGuest_id(long guest_id) {
        this.guest_id = guest_id;
    }

    public boolean isVoted() {
        return voted;
    }

    public void setVoted(boolean voted) {
        this.voted = voted;
    }
    //</editor-fold>

}
