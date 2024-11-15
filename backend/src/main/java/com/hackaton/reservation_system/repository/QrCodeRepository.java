package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
    @Modifying
    @Transactional
    @Query("update QrCode set qrCode = ?1, date = ?2 where id = ?3")
    void updateQrCode(byte[] qrCode, String date, Long id);
}
