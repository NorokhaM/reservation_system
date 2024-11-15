package com.hackaton.reservation_system.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name= "playgrounds")

public class Playground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String name;

    @Column
    private String address;

    @OneToMany(mappedBy="playground", cascade=CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservation;
}
