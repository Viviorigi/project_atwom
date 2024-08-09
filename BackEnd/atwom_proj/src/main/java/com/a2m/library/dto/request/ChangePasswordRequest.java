package com.a2m.library.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChangePasswordRequest {
	@NotEmpty
    private String currentPassword;
	@NotEmpty
    private String newPassword;
	@NotEmpty
    private String confirmationPassword;
}