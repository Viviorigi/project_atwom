package com.a2m.library.model;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListResponse<T> {
	private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public <E> ListResponse(List<T> content, Page<E> page) {
        this.content = content;
        this.pageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.last = page.isLast();
    }

    public static <T, E> ListResponse<T> of(List<T> content, Page<E> page) {
        return new ListResponse<>(content, page);
    }
}
