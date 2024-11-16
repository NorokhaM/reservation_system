package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.Controller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ControllerRepository extends JpaRepository<Controller, Long> {
}
