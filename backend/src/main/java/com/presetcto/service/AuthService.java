package com.presetcto.service;

import com.presetcto.dto.LoginRequest;
import com.presetcto.dto.LoginResponse;
import com.presetcto.dto.UserDTO;
import com.presetcto.entity.User;
import com.presetcto.repository.UserRepository;
import com.presetcto.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Authenticate user and return JWT token (v2 version)
     * Supports optional deviceId for tracking
     */
    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return new LoginResponse(false, "Usuário ou senha inválido");
        }

        User user = userOptional.get();

        if (!user.getActive()) {
            return new LoginResponse(false, "Usuário desativado");
        }

        // For MVP: compare plain password (in production, use passwordEncoder)
        if (!loginRequest.getPassword().equals(user.getPassword())) {
            return new LoginResponse(false, "Usuário ou senha inválido");
        }

        // Log device info if provided (v2 feature)
        if (loginRequest.getDeviceId() != null) {
            System.out.println("Device login: " + loginRequest.getDeviceId() + " for user: " + user.getUsername());
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getUsername());

        // Create user DTO
        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getName(), user.getEmail());

        return new LoginResponse(true, token, userDTO);
    }

    /**
     * Get user by username
     */
    public UserDTO getUserByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            return null;
        }

        User user = userOptional.get();
        return new UserDTO(user.getId(), user.getUsername(), user.getName(), user.getEmail());
    }

    /**
     * Create default user for MVP
     */
    public void createDefaultUsers() {
        // Create default user if not exists
        if (!userRepository.existsByUsername("morthagor")) {
            User defaultUser = new User("morthagor", "wp1234wp", "Morthagor", "morthagor@presetcto.com");
            userRepository.save(defaultUser);
        }
    }
}
