package com.hackaton.reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String username;


    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String role;

}
