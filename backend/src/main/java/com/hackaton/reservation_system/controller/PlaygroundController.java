package com.hackaton.reservation_system.controller;

import com.hackaton.reservation_system.model.Playground;
import com.hackaton.reservation_system.service.PlaygroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/playground")
public class PlaygroundController {

    private final PlaygroundService playgroundService;

    @Autowired
    public PlaygroundController(PlaygroundService playgroundService){
        this.playgroundService=playgroundService;
    }


    @GetMapping("/get/all")
    public ResponseEntity<List<Playground>> getAllPlaygrounds(){
        return ResponseEntity.ok(playgroundService.getAllPlaygrounds());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Playground> getPlayground(@PathVariable Long id){
        return ResponseEntity.ok(playgroundService.getPlaygroundById(id));
    }

    @GetMapping("/get-id/{name}")
    public ResponseEntity<Long> getPlaygroundIdByName(@PathVariable String name){
        return ResponseEntity.ok(playgroundService.findIdByName(name));
    }




}
