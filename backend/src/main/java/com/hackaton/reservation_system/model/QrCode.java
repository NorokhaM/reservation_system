package com.hackaton.reservation_system.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class QrCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String date;

    @Column
    private LocalDateTime time;

    @Lob
    private byte[] qrCode;

    public QrCode(String date, LocalDateTime time, byte[] qrCode) {
        this.date = date;
        this.time = time;
        this.qrCode = qrCode;
    }


}
