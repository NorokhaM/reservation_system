package com.hackaton.reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Controller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String rpi_link;

    @OneToOne(mappedBy = "controller")
    private Playground playground;

    @OneToMany(mappedBy = "controller", cascade = CascadeType.ALL)
    private List<Device> devices;
}
