package com.a2m.library.dto.response;

import lombok.Data;

@Data
public class DataResponse<T> {
	private String status;  
    private String message;   
    private T data;
}
