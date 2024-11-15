package com.hackaton.reservation_system.service;


import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import com.hackaton.reservation_system.model.QrCode;
import com.hackaton.reservation_system.repository.QrCodeRepository;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

@Service
public class QrCodeService {

    private final QrCodeRepository qrCodeRepository;
    private final KeyGeneratorService keyGeneratorService;

    @Autowired
    public QrCodeService(QrCodeRepository qrCodeRepository, KeyGeneratorService keyGeneratorService) {
        this.qrCodeRepository = qrCodeRepository;
        this.keyGeneratorService = keyGeneratorService;

    }

    public QrCode saveQrCode(QrCode qrCode) throws WriterException, IOException {
        return qrCodeRepository.save(qrCode);
    }

    public String readQRCode(byte[] qrCodeImage) throws IOException, NotFoundException {
        InputStream inputStream = new ByteArrayInputStream(qrCodeImage);
        BufferedImage bufferedImage = ImageIO.read(inputStream);
        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
        Result result = new MultiFormatReader().decode(bitmap);
        return result.getText();
    }

    public boolean compareQrCodes(String data, Long id) throws IOException, NotFoundException {
        String qrCodeData = readQRCode(getQrCodeImage(id));
        return qrCodeData.equals(data);
    }


    public byte[] updateQrCode(Long id) throws WriterException, IOException, NoSuchAlgorithmException {
        QrCode qrCode = qrCodeRepository.findById(id).orElseThrow();
        qrCode.setQrCode(
                generateQrCode(keyGeneratorService
                        .generateKey())
                        .getQrCode()
        );
        qrCode.setDate(keyGeneratorService.generateKey());
        qrCodeRepository.updateQrCode(qrCode.getQrCode(), qrCode.getDate(), id);
        return qrCode.getQrCode();
    }

    private byte[] getQrCodeImage(Long id) {
        return qrCodeRepository
                .findById(id)
                .orElseThrow()
                .getQrCode();
    }

    public QrCode generateQrCode(String key) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix matrix=qrCodeWriter.encode(key, BarcodeFormat.QR_CODE, 200, 200);
        BufferedImage bufferedImage= MatrixToImageWriter.toBufferedImage(matrix);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        byte[] imageInByte = baos.toByteArray();
        return new QrCode(key, LocalDateTime.now(), imageInByte);
    }



}
