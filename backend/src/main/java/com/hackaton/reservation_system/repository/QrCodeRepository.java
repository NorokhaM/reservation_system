package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {


}
