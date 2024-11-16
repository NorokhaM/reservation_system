package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {


}
