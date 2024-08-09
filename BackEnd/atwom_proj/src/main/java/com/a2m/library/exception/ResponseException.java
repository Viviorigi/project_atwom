package com.a2m.library.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ResponseException extends RuntimeException {
	private HttpStatus status;
    private String message;

    public ResponseException(String message, HttpStatus status){
        super(message);
        this.status = status;
        this.message = message;
    }
}
