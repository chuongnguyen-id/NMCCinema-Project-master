package com.vti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.MovieFormForCreating;
import com.vti.dto.MovieFormForUpdating;
import com.vti.entity.Movie;
import com.vti.service.IMovieService;


@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/v1/movies")
public class MovieController {

	@Autowired
	private IMovieService movieService;
	
	@GetMapping()
	public ResponseEntity<?> getAllMovies(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Movie> entities = movieService.getAllMovies(pageable, search);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}
	
	@GetMapping(value = "title/{title}")
	public ResponseEntity<?> existsMovieByTitle(@PathVariable(name = "title") String title) {
		return new ResponseEntity<>(movieService.isMovieExistsByTitle(title), HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getMovieByID(@PathVariable(name = "id") int id) {
		return new ResponseEntity<>(movieService.getMovieByID(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> createMovie(@RequestBody MovieFormForCreating form) {
		movieService.createMovie(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateMovie(@PathVariable(name = "id") int id, @RequestBody MovieFormForUpdating form) {
		movieService.updateMovie(id, form);
		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping()
	public ResponseEntity<?> deleteMovies(@RequestParam(name = "ids") List<Integer> ids) {
		movieService.deleteMovies(ids);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
	
}
