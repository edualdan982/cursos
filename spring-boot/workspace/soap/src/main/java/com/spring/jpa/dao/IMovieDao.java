package com.spring.jpa.dao;

import org.springframework.data.repository.CrudRepository;

import com.spring.jpa.entity.MovieEntity;

public interface IMovieDao extends CrudRepository<MovieEntity, Long> {
	public MovieEntity findByTitle(String title);
}
