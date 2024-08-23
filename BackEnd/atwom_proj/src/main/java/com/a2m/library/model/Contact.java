package com.a2m.library.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, insertable = false,name = "contact_id")
    private Long id;
	
	private String email;
	
	private String firstName;
	
	private String lastName;
	
	private String question;
	
	@Column(name = "cre_dt")
	private LocalDateTime createdDate;
	
	@Column(name = "resp_dt")
	private LocalDateTime responseDate;
	
	private String response;
}
