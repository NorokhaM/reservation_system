package com.hackaton.reservation_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AutoConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
