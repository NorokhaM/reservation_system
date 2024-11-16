package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.Playground;
import com.hackaton.reservation_system.repository.ControllerRepository;
import com.hackaton.reservation_system.repository.PlaygroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaygroundService {

    private final PlaygroundRepository playgroundRepository;
    private final ControllerRepository controllerRepository;

    @Autowired
    public PlaygroundService(PlaygroundRepository playgroundRepository, ControllerRepository controllerRepository){
        this.playgroundRepository=playgroundRepository;
        this.controllerRepository=controllerRepository;
    }

    public Playground addPlayground(Playground playground) {
        String name= playground.getName();
        if (existsByName(name)) {
            throw new RuntimeException("Playground already exists");
        }
        return playgroundRepository.save(playground);
    }

    public Playground getPlaygroundById(Long id){
        return playgroundRepository.findById(id).orElseThrow(
                ()->new RuntimeException("Playground not found")
        );


    }


    public Playground addToPlayground(Long controllerId, Long playgroundId){
        Playground playground = playgroundRepository.findById(playgroundId).orElseThrow();
        playground.setController(controllerRepository.findById(controllerId).orElseThrow());
        return playgroundRepository.save(playground);
    }

    private boolean existsByName(String name) {
        return playgroundRepository
                .findByName(name)
                .isPresent();
    }

    public Long findIdByName(String name) {
        return playgroundRepository
                .findByName(name)
                .orElse(null)
                .getId();
    }

    public List<Playground> getAllPlaygrounds(){
        return playgroundRepository.findAll();
    }

    public void deletePlayground(Long id){
        playgroundRepository.deleteById(id);
    }
}
