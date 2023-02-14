package com.vti.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vti.dto.TicketFormForCreating;
import com.vti.entity.Movie;
import com.vti.entity.Ticket;
import com.vti.entity.User;
import com.vti.repository.MovieRepository;
import com.vti.repository.TicketRepository;
import com.vti.repository.UserRepository;

@Service
public class TicketService implements ITicketService {

	@Autowired
	private TicketRepository repository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MovieRepository movieRepository;
	
	public Page<Ticket> getAllTickets(Pageable pageable) {
		return repository.findAll(pageable);
	}

	public boolean isTicketExistsBySeat(String seat) {
		return repository.existsBySeat(seat);
	}

	public void createTicket(TicketFormForCreating form) {
		User user = userRepository.findById(form.getUserId()).get();
		Movie movie = movieRepository.findById(form.getMovieId()).get();
		
		int randomCode = new Random().nextInt(900000000) + 100000000;
		
		Ticket ticket = new Ticket();
		ticket.setCode(randomCode);
		ticket.setSeat(form.getSeat());
		ticket.setDate(form.getDate());
		ticket.setTime(form.getTime());
		ticket.setPrice(form.getPrice());
		ticket.setUser(user);
		ticket.setMovie(movie);
		
		repository.save(ticket);
	}

	public List<Ticket> getAllTicketsByUserID(int userId) {
		return repository.findByUserId(userId);
	}
	
	public Ticket getTitleByMovieID(int movieId) {
		return repository.findByMovieId(movieId);
	}
	
	@Transactional
	public void deleteTickets(List<Short> ids) {
		repository.deleteByIdIn(ids);	
	}


}
