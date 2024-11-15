package com.hackaton.reservation_system.controller;

import com.google.zxing.NotFoundException;
import com.google.zxing.WriterException;
import com.hackaton.reservation_system.service.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/qr-code")
public class QrCodeController {

    private final QrCodeService qrCodeService;

    @Autowired
    public QrCodeController(QrCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    @GetMapping(value = "/get/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getQrCodeImage(@PathVariable Long id) throws IOException, WriterException, NoSuchAlgorithmException {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(qrCodeService.updateQrCode(id));
    }

    @PostMapping("/compare/{id}")
    public ResponseEntity<Boolean> compareQrCodes(@RequestParam String data, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(qrCodeService.compareQrCodes(data, id));
        } catch (IOException | NotFoundException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
