package com.a2m.library.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_uid")
	private Long userUid;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "email")
	private String email;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "dob")
	private LocalDateTime dob;

	@Column(name = "class_name")
	private String className;

	@Column(name = "phone")
	private String phone;

	@Column(name = "address")
	private String address;

	@Column(name = "avatar")
	private String avatar;

	@Column(name = "cre_dt")
	private LocalDateTime cre_dt;

	@Column(name = "upd_dt")
	private LocalDateTime upd_dt;

	@Column(name = "deleted")
	private Boolean deleted = false;

	@Column(name = "is_active")
	private boolean isActive = false;

	@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
	private List<Role> roles;

}
