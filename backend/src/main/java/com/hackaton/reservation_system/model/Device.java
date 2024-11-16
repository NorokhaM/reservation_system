package com.hackaton.reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String name;

    @Column
    private String deviceIp;

    @Column
    private String deviceType;

    @Transient
    private Long playground;

    @ManyToOne
    @JoinColumn(name = "controller_id", referencedColumnName = "id")
    private Controller controller;
}
