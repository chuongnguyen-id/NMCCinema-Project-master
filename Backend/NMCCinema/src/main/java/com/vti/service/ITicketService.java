package com.vti.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.dto.TicketFormForCreating;
import com.vti.entity.Ticket;

public interface ITicketService {

	Page<Ticket> getAllTickets(Pageable pageable);

	boolean isTicketExistsBySeat(String seat);

	void createTicket(TicketFormForCreating form);

	void deleteTickets(List<Short> ids);

	List<Ticket> getAllTicketsByUserID(int userId);
	
	Ticket getTitleByMovieID(int movieId);

}
