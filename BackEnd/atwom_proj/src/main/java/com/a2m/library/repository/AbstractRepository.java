package com.a2m.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AbstractRepository <TEntity> extends JpaRepository<TEntity,Integer>, JpaSpecificationExecutor<TEntity> {
}
