package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.model.MyUser;
import com.hackaton.reservation_system.service.MyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

    private final MyUserService myUserService;

    public SecurityController(MyUserService myUserService){
        this.myUserService=myUserService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registerUser(@RequestBody MyUser myUser) {
        if (myUserService.existsByUsername(myUser.getUsername())
                || myUserService.existsByEmail(myUser.getEmail())) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        return ResponseEntity.ok(myUserService.registerUser(myUser));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody MyUser myUser){
        myUserService.findByEmailAndSetUsername(myUser);
        return ResponseEntity.ok(myUserService.verifyUser(myUser));
    }

}
