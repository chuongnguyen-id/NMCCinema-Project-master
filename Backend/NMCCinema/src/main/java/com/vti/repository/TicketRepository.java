package com.vti.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Short>, JpaSpecificationExecutor<Ticket> {

	public Ticket findBySeat(String seat);

	public boolean existsBySeat(String seat);

	public void deleteByIdIn(List<Short> ids);

	public List<Ticket> findByUserId(int userId);
	
	public Ticket findByMovieId(int movieId);

}
