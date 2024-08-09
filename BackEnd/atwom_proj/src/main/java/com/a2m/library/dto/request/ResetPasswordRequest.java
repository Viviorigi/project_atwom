package com.a2m.library.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ResetPasswordRequest {
	@NotEmpty
    private String newPassword;
	@NotEmpty
    private String confirmationPassword;
}
