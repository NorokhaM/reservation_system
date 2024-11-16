package com.hackaton.reservation_system.controller;


import com.hackaton.reservation_system.model.Controller;
import com.hackaton.reservation_system.model.Device;
import com.hackaton.reservation_system.model.Playground;
import com.hackaton.reservation_system.service.AdminService;
import com.hackaton.reservation_system.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private final RestTemplate restTemplate;

    @Autowired
    public AdminController(AdminService adminService, RestTemplate restTemplate){
        this.adminService=adminService;
        this.restTemplate=restTemplate;
    }

    @PostMapping("/add-to-playground/{playgroundId}/{controllerId}")
    public String addToPlayground(@PathVariable Long controllerId, @PathVariable Long playgroundId){
        String url = "https://iothub-nrzb.onrender.com/playgrounds/create_playground";
        restTemplate.postForObject(url, playgroundId, String.class);
        return adminService.addToPlayground(controllerId, playgroundId).getName();
    }

    @PostMapping("add-controller")
    public ResponseEntity<Controller> addController(@RequestBody Controller controller){
        return ResponseEntity.ok(adminService.addController(controller));
    }

    @PostMapping("/add-playground")
    public ResponseEntity<Playground> addPlayground(@RequestBody Playground playground){
        return ResponseEntity.ok(adminService.addPlayground(playground));
    }

    @PostMapping("/add-device/{controlledId}")
    public ResponseEntity<Device> addDevice(@RequestBody Device device, @PathVariable Long controlledId) {
        String url = "https://iothub-nrzb.onrender.com/devices/create_device";
        restTemplate.postForObject(url, controlledId, String.class);
        return ResponseEntity.ok(adminService.addDevice(device, controlledId));
    }

    @DeleteMapping("/delete-playground/{id}")
    public void deletePlayground(@PathVariable Long id){
        adminService.deletePlayground(id);
    }



}
