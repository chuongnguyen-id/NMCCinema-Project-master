package com.vti.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.dto.MovieFormForCreating;
import com.vti.dto.MovieFormForUpdating;
import com.vti.entity.Movie;

public interface IMovieService {

	Page<Movie> getAllMovies(Pageable pageable, String search);

	boolean isMovieExistsByTitle(String title);

	Movie getMovieByID(int id);

	void createMovie(MovieFormForCreating form);

	void updateMovie(int id, MovieFormForUpdating form);

	void deleteMovies(List<Integer> ids);

}
