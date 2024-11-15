package com.hackaton.reservation_system.service;

import com.hackaton.reservation_system.model.MyUser;
import com.hackaton.reservation_system.repository.MyUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyUserService {

    private final MyUserRepository myUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public MyUserService(MyUserRepository myUserRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService){
        this.myUserRepository=myUserRepository;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
        this.jwtService=jwtService;
    }

    public MyUser registerUser(MyUser user) {
        String email= user.getEmail();
        String username=user.getUsername();
        if (existsByEmail(email) ||
                existsByUsername(username)) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myUserRepository.save(user);
    }

    public String verifyUser(MyUser user){
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "User is not ok";
    }



    private boolean existsByEmail(String email) {
        return myUserRepository
                .findByEmail(email)
                .isPresent();
    }

    private boolean existsByUsername(String username) {
        return myUserRepository
                .findByUsername(username)
                .isPresent();
    }

    public void findByEmailAndSetUsername(MyUser user) {
        myUserRepository
                .findByEmail(user.getEmail())
                .ifPresent(foundUser -> user.setUsername(foundUser.getUsername()));
    }

    public Long findIdByUsername(String username) {
        return myUserRepository
                .findByUsername(username)
                .map(MyUser::getId)
                .orElseThrow();
    }
}
