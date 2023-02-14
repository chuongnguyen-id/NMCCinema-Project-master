package com.vti.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vti.dto.MovieFormForCreating;
import com.vti.dto.MovieFormForUpdating;
import com.vti.entity.Movie;
import com.vti.repository.MovieRepository;
import com.vti.specification.MovieSpecificationBuilder;

@Service
public class MovieService implements IMovieService {

	@Autowired
	private MovieRepository movieRepository;
	
	public Page<Movie> getAllMovies(Pageable pageable, String search) {
		
		MovieSpecificationBuilder specification = new MovieSpecificationBuilder(search);
		
		return movieRepository.findAll(specification.build(), pageable);
	}
	
	public  boolean isMovieExistsByTitle(String title) {
		return movieRepository.existsByTitle(title);
	}
	
	public Movie getMovieByID(int id) {
		return movieRepository.findById(id).get();
	}
	
	public void createMovie(MovieFormForCreating form) {
		movieRepository.save(form.toEntity());
	}
	
	public void updateMovie(int id, MovieFormForUpdating form) {
		Movie entity = movieRepository.findById(id).get();
		entity.setTitle(form.getTitle());
		entity.setTheater(form.getTheater());
		entity.setPosterUrl(form.getPosterUrl());
		entity.setBannerUrl(form.getBannerUrl());
		entity.setDirector(form.getDirector());
		entity.setOverview(form.getOverview());
		entity.setGenre(form.getGenre());
		entity.setRated(form.getRated());
		entity.setReleasedDate(form.getReleasedDate());
		entity.setDuration(form.getDuration());
		movieRepository.save(entity);
	}
	
	@Transactional
	public void deleteMovies(List<Integer> ids) {
		movieRepository.deleteByIdIn(ids);
	}
}
