package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.Playground;
import com.hackaton.reservation_system.repository.PlaygroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaygroundService {

    private final PlaygroundRepository playgroundRepository;

    @Autowired
    public PlaygroundService(PlaygroundRepository playgroundRepository){
        this.playgroundRepository=playgroundRepository;
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
}
