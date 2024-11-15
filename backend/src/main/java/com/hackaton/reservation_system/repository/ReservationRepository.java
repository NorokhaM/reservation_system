package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<List<Reservation>> findAllByPlaygroundId(Long playgroundId);
    Optional<List<Reservation>> findAllByUserId(Long userId);
}
