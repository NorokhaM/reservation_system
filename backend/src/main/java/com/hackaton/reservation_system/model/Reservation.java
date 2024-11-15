package com.hackaton.reservation_system.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name= "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String reservationStartDate;

    @Column
    private String reservationEndDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private MyUser user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "playground_id", referencedColumnName = "id")
    @JsonIgnore
    private Playground playground;
}
