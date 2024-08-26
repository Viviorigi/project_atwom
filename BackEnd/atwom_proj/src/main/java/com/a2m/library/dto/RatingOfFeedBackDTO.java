package com.a2m.library.dto;

import lombok.Data;

@Data
public class RatingOfFeedBackDTO {
	private double ave_rate1;
	private double ave_rate2;
	private double ave_rate3;
	private double ave_rate4;
	private double ave_rate5;
	private int totalRate;
	private double ave_AllRate;
}
