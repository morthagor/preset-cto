package com.presetcto.dto;

import java.io.Serializable;
import java.util.Date;

public class LoginResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private boolean success;
    private String token;
    private UserDTO user;
    private String message;
    private Long expiresIn; // Token expiration time in milliseconds
    private Long timestamp; // Response timestamp

    public LoginResponse() {
        this.timestamp = System.currentTimeMillis();
    }

    public LoginResponse(boolean success, String token, UserDTO user) {
        this.success = success;
        this.token = token;
        this.user = user;
        this.expiresIn = 86400000L; // 24 hours in milliseconds
        this.timestamp = System.currentTimeMillis();
    }

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.timestamp = System.currentTimeMillis();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
