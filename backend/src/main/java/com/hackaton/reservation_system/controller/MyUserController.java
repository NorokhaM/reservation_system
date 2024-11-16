package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.model.MyUser;
import com.hackaton.reservation_system.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class MyUserController {

    private final MyUserService myUserService;


    @Autowired
    public MyUserController(MyUserService myUserService){
        this.myUserService=myUserService;
    }


    @GetMapping("/get-user-by-name")
    public ResponseEntity<MyUser> getUserByName(Principal principal) {
        return ResponseEntity.ok(myUserService.findByUsername(principal.getName()));
    }

    @GetMapping("/get-id")
    public ResponseEntity<Long> getUserIdByUsername(Principal principal) {
        return ResponseEntity.ok(myUserService.findIdByUsername(principal.getName()));
    }

    @PutMapping("user-update/{id}")
    public ResponseEntity<MyUser> updateUser(@RequestBody MyUser myUser, @PathVariable Long id) {
        return ResponseEntity.ok(myUserService.updateUser(myUser, id));
    }


}
