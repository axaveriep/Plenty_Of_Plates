package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="event")
public class Event {

    @Id
    @Column(name="event_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @Column(name="user_id")
    private Long userId;

//    @Column(name="event_name")
//    private String eventName;

    @Column(name="date")
    private LocalDate date;

    @Column(name="time")
    private Timestamp time;


    public Event(Long eventId, Long userId, LocalDate date, Timestamp time) {
        this.eventId = eventId;
        this.userId = userId;
        this.date = date;
        this.time = time;
    }


    /* EVENT = CHILD, USER = PARENT */
//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name="user_id", insertable = false, updatable = false)
//    private User user;


}
