package com.a2m.library.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feed_back")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedBack {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	private Double rating;
	private String comment;
	
	@ManyToOne
//	@JsonBackReference(value = "book-reference")
//	@JsonIgnore
	@JoinColumn(name = "book_id")
	private Book book;
	
	@ManyToOne
//	@JsonBackReference(value = "user-reference")
//	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User user;
}
