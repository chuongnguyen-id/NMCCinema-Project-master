package com.vti.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "`Ticket`")
public class Ticket implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "`id`", unique = true, nullable = false)
	private int id;

	@Column(name = "`code`", length = 10, nullable = false, unique = true)
	private int code;

	@Column(name = "`seat`", length = 50, nullable = false)
	private String seat;
	
	@Column(name = "date", nullable = false)
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="dd-MM-yyyy")
	@CreatedDate
	private Date date;
	
	@Column(name = "time", nullable = false)
	private String time;
	
	@Column(name = "`price`", nullable = false)
	private float price;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@ManyToOne
	@JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;
	
	public Ticket() {
	}
	
	public Ticket(int code, String seat, Date date, String time, float price, User user,
			Movie movie) {
		super();
		this.code = code;
		this.seat = seat;
		this.date = date;
		this.time = time;
		this.price = price;
		this.user = user;
		this.movie = movie;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getSeat() {
		return seat;
	}

	public void setSeat(String seat) {
		this.seat = seat;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}
	
	
}
