package com.hackaton.reservation_system.repository;

import com.hackaton.reservation_system.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByEmail(String email);
    Optional<MyUser> findByUsername(String username);
}
