package com.hackaton.reservation_system.service;

import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;

@Service
public class KeyGeneratorService {

    public String generateKey() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator=KeyGenerator.getInstance("HmacSHA256");
        SecretKey secretKey=keyGenerator.generateKey();
        return new String(Hex.encode(secretKey.getEncoded()));
    }
}
