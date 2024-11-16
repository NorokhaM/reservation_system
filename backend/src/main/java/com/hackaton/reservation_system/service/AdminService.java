package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.Controller;
import com.hackaton.reservation_system.model.Device;
import com.hackaton.reservation_system.model.Playground;
import com.hackaton.reservation_system.repository.ControllerRepository;
import com.hackaton.reservation_system.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final PlaygroundService playgroundService;
    private final ControllerRepository controllerRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public AdminService(PlaygroundService playgroundService, ControllerRepository controllerRepository, DeviceRepository deviceRepository){
        this.playgroundService=playgroundService;
        this.controllerRepository=controllerRepository;
        this.deviceRepository=deviceRepository;
    }


    public Playground addPlayground(Playground playground){
        return playgroundService.addPlayground(playground);
    }

    public Playground addToPlayground(Long controllerId, Long playgroundId){
        return playgroundService.addToPlayground(controllerId, playgroundId);
    }

    public Device addDevice(Device device, Long controllerId) {
        Controller controller = controllerRepository.findById(controllerId)
                .orElseThrow(() -> new IllegalArgumentException("Controller not found"));
        device.setController(controller);
        return deviceRepository.save(device);
    }

    public void deletePlayground(Long id){
        playgroundService.deletePlayground(id);
    }

    public Controller addController(Controller controller){
        return controllerRepository.save(controller);
    }



}
