package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.Reservation;
import com.hackaton.reservation_system.model.Status;
import com.hackaton.reservation_system.repository.MyUserRepository;
import com.hackaton.reservation_system.repository.PlaygroundRepository;
import com.hackaton.reservation_system.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MyUserRepository myUserRepository;
    private final PlaygroundRepository playgroundRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, MyUserRepository myUserRepository, PlaygroundRepository playgroundRepository){
        this.reservationRepository=reservationRepository;
        this.myUserRepository=myUserRepository;
        this.playgroundRepository=playgroundRepository;
    }


    public Reservation addReservation(Reservation reservation, Long userId, Long playgroundId) {
        reservation.setUser(
                myUserRepository.findById(userId).orElseThrow()
        );
        reservation.setPlayground(
                playgroundRepository.findById(playgroundId).orElseThrow()
        );
        return reservationRepository.save(reservation);
    }

    public boolean deleteReservation(Long id){
        reservationRepository.deleteById(id);
        return true;
    }

    public List<String> getReservationTimeByPlaygroundId(Long playgroundId){
        List<Reservation> reservations = reservationRepository.findAllByPlaygroundId(playgroundId).orElse(new ArrayList<>());
        List<String> times = new ArrayList<>();
        for (Reservation reservation : reservations){
            times.add(timeParser(reservation.getReservationEndDate()));
        }
        return times;
    }

    public List<Reservation> getReservationsByUserId(Long userId){
        return reservationRepository.findAllByUserId(userId).orElse(new ArrayList<>());
    }


    @Scheduled(cron = "0 */30 * * * *")
    public void deletePastReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        for (Reservation reservation : reservations) {
            LocalDateTime reservationDateTime = LocalDateTime.parse(reservation.getReservationEndDate(), formatter);
            if (reservationDateTime.isBefore(now)) {
                reservationRepository.delete(reservation);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * MON")
    public void reschedulePastReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        for (Reservation reservation : reservations) {
            LocalDateTime reservationDateTime = LocalDateTime.parse(reservation.getReservationEndDate(), formatter);
            if (reservationDateTime.isBefore(now) && reservation.getStatus().equals(Status.REGULAR)) {
                LocalDateTime newStartDate = reservationDateTime.plusWeeks(1);
                reservation.setReservationStartDate(newStartDate.format(formatter));
                reservationRepository.save(reservation);
            }
        }
    }


    private String timeParser(String time){
        String[] timeArray = time.split("\\s");
        return timeArray[1];
    }

}
