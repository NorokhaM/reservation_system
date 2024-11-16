package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.model.Payment;
import com.hackaton.reservation_system.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService){
        this.paymentService=paymentService;
    }


    @PostMapping("/add/{reservationId}")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment, @PathVariable Long reservationId){
        return ResponseEntity.ok(paymentService.addPayment(payment, reservationId));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long id){
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Payment>> getAllPayments(){
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

}
