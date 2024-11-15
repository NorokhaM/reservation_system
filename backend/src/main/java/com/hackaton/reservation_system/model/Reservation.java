package com.hackaton.reservation_system.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private MyUser user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "playground_id", referencedColumnName = "id")
    private Playground playground;
}
