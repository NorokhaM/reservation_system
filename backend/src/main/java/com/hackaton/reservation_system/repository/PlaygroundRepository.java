package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.Playground;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface PlaygroundRepository extends JpaRepository<Playground, Long> {
    Optional<Playground> findByName(String name);
}
