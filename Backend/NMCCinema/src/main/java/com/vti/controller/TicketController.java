package com.vti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.TicketFormForCreating;
import com.vti.entity.Ticket;
import com.vti.service.ITicketService;

@RestController
@RequestMapping(value = "api/v1/tickets")
public class TicketController {

	@Autowired
	private ITicketService service;

	@GetMapping()
	public ResponseEntity<?> getAllTickets(Pageable pageable) {
		Page<Ticket> entities = service.getAllTickets(pageable);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	@GetMapping(value = "/seat/{seat}")
	public ResponseEntity<?> existsTicketByName(@PathVariable(name = "seat") String seat) {
		return new ResponseEntity<>(service.isTicketExistsBySeat(seat), HttpStatus.OK);
	}

	@PostMapping()
	public ResponseEntity<?> createTicket(@RequestBody TicketFormForCreating form) {
		service.createTicket(form);
		return new ResponseEntity<String>("Create successfully!", HttpStatus.OK);
	}

	@GetMapping("user/{userId}")
	  public ResponseEntity<List<Ticket>> getAllTicketsByUserId(@PathVariable(value = "userId") int userId) {
	    List<Ticket> entities = service.getAllTicketsByUserID(userId);
	    return new ResponseEntity<>(entities, HttpStatus.OK);
	 }

	@GetMapping("movie/{movieId}")
	  public ResponseEntity<?> getTitleByMovieId(@PathVariable(value = "movieId") int movieId) {
	    return new ResponseEntity<>(service.getTitleByMovieID(movieId), HttpStatus.OK);
	 }
	
	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteTickets(@PathVariable(name = "ids") List<Short> ids) {
		service.deleteTickets(ids);
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
}
