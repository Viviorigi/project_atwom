package com.a2m.library.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class BaseResponse {
	private Integer code;
    private String message;
    private Object data;

    public BaseResponse(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
