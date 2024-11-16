package com.hackaton.reservation_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Playground playground;

    @OneToMany(mappedBy = "controller", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Device> devices;
}
