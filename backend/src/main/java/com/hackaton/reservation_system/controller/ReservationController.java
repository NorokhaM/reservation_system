package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.model.Reservation;
import com.hackaton.reservation_system.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService=reservationService;
    }


    @PostMapping("/add/{userId}/{playgroundId}")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation, @PathVariable Long userId, @PathVariable Long playgroundId) throws Exception{
        return ResponseEntity.ok(reservationService.addReservation(reservation, userId, playgroundId));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id){
        return ResponseEntity.ok(reservationService.deleteReservation(id));
    }


    @GetMapping("get/playground/{playgroundId}")
    public ResponseEntity<List<String>> getReservationsByPlaygroundId(@PathVariable Long playgroundId){
        return ResponseEntity.ok(reservationService.getReservationTimeByPlaygroundId(playgroundId));
    }


    @GetMapping("/get/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(reservationService.getReservationsByUserId(userId));
    }








}
