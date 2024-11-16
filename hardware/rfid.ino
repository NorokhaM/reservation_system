#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include <SPI.h>

// WiFi credentials
const char* ssid = "My_Raspberry_Pi_AP";
const char* password = "11111111";

// Static IP configuration
IPAddress local_IP(192, 168, 4, 10);   // Static IP for ESP32
IPAddress gateway(192, 168, 4, 1);     // Raspberry Pi IP
IPAddress subnet(255, 255, 255, 0);

// Server URL
const char* serverUrl = "http://192.168.4.1:5000/scan"; // Replace with your server IP and port

// RFID setup
#define RST_PIN 0
#define SS_PIN 5
#define Succses 32
#define Error 33
#define LightPin 25
MFRC522 rfid(SS_PIN, RST_PIN);

WebServer server(80);

const unsigned long WIFI_TIMEOUT = 15000;

void setup() {
    Serial.begin(115200);
    pinMode(Succses, OUTPUT);
    pinMode(LightPin, OUTPUT);
    pinMode(Error, OUTPUT);
    SPI.begin();
    rfid.PCD_Init();
    Serial.println("RFID ready!");

    IPAddress local_IP(192, 168, 4, 10);
    IPAddress gateway(192, 168, 4, 1);
    IPAddress subnet(255, 255, 255, 0);
    
    if (!WiFi.config(local_IP, gateway, subnet)) {
        Serial.println("Failed to configure Static IP");
    }

    // Scan for networks to verify AP visibility
    Serial.println("Scanning for networks...");
    int n = WiFi.scanNetworks();
    for (int i = 0; i < n; i++) {
        Serial.print("Network name: ");
        Serial.println(WiFi.SSID(i));
    }

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    unsigned long startTime = millis();

    while (WiFi.status() != WL_CONNECTED && millis() - startTime < WIFI_TIMEOUT) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to WiFi");
        Serial.print("ESP32 IP Address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("Failed to connect to WiFi. Please check AP settings or credentials.");
    }

    // Define the light control endpoint
    server.on("/scan", handleScan);
    server.on("/control", HTTP_POST, handleControl);
    server.begin();
}

void loop() {
    // Handle web server requests
    server.handleClient();

    // Periodically scan for RFID cards
    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
        String cardId = getCardId();
        Serial.println("Card ID: " + cardId);

        // Send RFID data to server
        sendCardToServer(cardId);
    }

    delay(1000); // Delay to avoid rapid scanning
}

String getCardId() {
    String cardId = "";
    for (byte i = 0; i < rfid.uid.size; i++) {
        cardId += String(rfid.uid.uidByte[i], HEX);
    }
    cardId.toUpperCase();
    return cardId;
}

void sendCardToServer(String cardId) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String payload = "{\"card_id\": \"" + cardId + "\"}";
        int httpResponseCode = http.POST(payload);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Server Response: " + response);

            // Parse the JSON response
            StaticJsonDocument<200> doc;
            DeserializationError error = deserializeJson(doc, response);

            if (error) {
                Serial.print("JSON Parsing Error: ");
                Serial.println(error.c_str());
                digitalWrite(Error, HIGH);  // Turn error LED on
                delay(1000);
                digitalWrite(Error, LOW);  // Turn error LED off
                return;
            }

            // Check if the response contains "status": "success"
            if (doc["status"] == "success") {
                digitalWrite(Succses, HIGH);  // Turn success LED on
                delay(1000);
                digitalWrite(Succses, LOW);  // Turn success LED off
            } else if (doc["detail"]) {  // Handle the "detail" field for failures
                Serial.println("Error: " + String((const char*)doc["detail"]));
                digitalWrite(Error, HIGH);  // Turn error LED on
                delay(1000);
                digitalWrite(Error, LOW);  // Turn error LED off
            } else {
                Serial.println("Unknown Response Format");
                digitalWrite(Error, HIGH);  // Turn error LED on
                delay(1000);
                digitalWrite(Error, LOW);  // Turn error LED off
            }
        } else {
            digitalWrite(Error, HIGH);  // Turn error LED on
            delay(1000);
            digitalWrite(Error, LOW);  // Turn error LED off
            Serial.println("Error in HTTP request");
        }

        http.end();
    } else {
        Serial.println("WiFi not connected");
    }
}

void handleScan() {
    // Endpoint to manually trigger RFID scanning
    String cardId = getCardId();

    if (cardId != "") {
        sendCardToServer(cardId);
        server.send(200, "application/json", "{\"status\": \"success\", \"card_id\": \"" + cardId + "\"}");
    } else {
        server.send(400, "application/json", "{\"status\": \"fail\", \"message\": \"No card detected\"}");
    }
}

void handleControl() {
    if (server.hasArg("plain")) {
        String body = server.arg("plain");
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, body);

        if (error) {
            Serial.print("JSON Parsing Error: ");
            Serial.println(error.c_str());
            server.send(400, "application/json", "{\"status\": \"fail\", \"message\": \"Invalid JSON format\"}");
            return;
        }

        if (doc.containsKey("power")) {
            String power = doc["power"];
            if (power == "on") {
                digitalWrite(LightPin, HIGH); // Turn the light on
                server.send(200, "application/json", "{\"status\": \"success\", \"message\": \"Light turned on\"}");
            } else if (power == "off") {
                digitalWrite(LightPin, LOW); // Turn the light off
                server.send(200, "application/json", "{\"status\": \"success\", \"message\": \"Light turned off\"}");
            } else {
                server.send(400, "application/json", "{\"status\": \"fail\", \"message\": \"Invalid power state\"}");
            }
        } else {
            server.send(400, "application/json", "{\"status\": \"fail\", \"message\": \"Missing power field\"}");
        }
    } else {
        server.send(400, "application/json", "{\"status\": \"fail\", \"message\": \"No body provided\"}");
    }
}
