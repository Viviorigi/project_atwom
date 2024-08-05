package com.a2m.library.constant;

public enum RoleEnum {
	STUDENT_USER("ROLE_STUDENT"), ADMIN_USER("ROLE_ADMIN");
	
	private String value;

	private RoleEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
