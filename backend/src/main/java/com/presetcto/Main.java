package com.presetcto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import com.presetcto.service.AuthService;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(Main.class, args);
        
        // Create default users for MVP
        AuthService authService = context.getBean(AuthService.class);
        authService.createDefaultUsers();
    }
}
