package com.hackaton.reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String paymentDate;

    @Column
    private String paymentTime;

    @Column
    private String paymentAmount;

    @Column
    private String paymentMethod;

    @Column
    private String cardNumber;

    @Column
    private String cardHolder;

    @OneToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    private Reservation reservation;

}
