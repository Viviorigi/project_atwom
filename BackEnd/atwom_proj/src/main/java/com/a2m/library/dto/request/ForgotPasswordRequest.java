package com.a2m.library.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ForgotPasswordRequest {

	@NotEmpty(message = "Email must not be empty")
	@Email(message = "Email should be valid")
	private String email;
}
