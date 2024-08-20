package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.a2m.library.model.ImagesBook;

@Repository
public interface ImagesBookRepository extends JpaRepository<ImagesBook, Integer>{

}
