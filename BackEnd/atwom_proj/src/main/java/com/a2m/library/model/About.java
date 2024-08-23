package com.a2m.library.model;

import java.time.LocalDateTime;

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
@Table(name = "about")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class About {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "about_id")
	private Long id;
	
	private String question;
	
	@Column(columnDefinition = "TEXT")
	private String answer;
	
	@Column(name = "cre_dt")
	private LocalDateTime cre_dt;

	@Column(name = "upd_dt")
	private LocalDateTime upd_dt;
}
