package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class MyUserController {

    private final MyUserService myUserService;


    @Autowired
    public MyUserController(MyUserService myUserService){
        this.myUserService=myUserService;
    }


    @GetMapping("/getName")
    public ResponseEntity<String> getUserName(Principal principal){
        return ResponseEntity.ok(principal.getName());
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username){
        return ResponseEntity.ok(myUserService.findIdByUsername(username));
    }
}
