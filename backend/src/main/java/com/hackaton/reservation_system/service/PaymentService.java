package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.Payment;
import com.hackaton.reservation_system.model.Reservation;
import com.hackaton.reservation_system.repository.PaymentRepository;
import com.hackaton.reservation_system.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, ReservationRepository reservationRepository){
        this.paymentRepository=paymentRepository;
        this.reservationRepository=reservationRepository;
    }

    public Payment addPayment(Payment payment, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        payment.setReservation(reservation);
        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(Long id){
        return paymentRepository.findById(id).orElseThrow(
                ()->new RuntimeException("Payment not found")
        );
    }

    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

}
