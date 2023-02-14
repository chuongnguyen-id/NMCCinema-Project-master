package com.vti.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "`Movie`")
public class Movie implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "`id`", unique = true, nullable = false)
	private int id;
	
	@Column(name = "`title`", nullable = false, length = 1024, unique = true)
	private String title;

	@Column(name = "`theater`", length = 10, nullable = false)
	private String theater;
	
	@Column(name = "`poster_url`", length = 512)
	private String posterUrl;
	
	@Column(name = "`banner_url`", length = 512)
	private String bannerUrl;
	
	@Column(name = "`director`", length = 100)
	private String director;
	
	@Column(name = "`overview`", length = 1000)
	private String overview;

	@Column(name = "`genre`", length = 100)
	private String genre;
	
	@Column(name = "`rated`", length = 10)
	private String rated;
	
	@Column(name = "released_date")
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="dd-MM-yyyy")
	@CreationTimestamp
	private Date releasedDate;
	
	@Column(name = "`duration`", length = 512)
	private int duration;

	public Movie(String title, String theater, String posterUrl, String bannerUrl, String director, String overview, String genre, String rated,Date releasedDate, int duration) {
		this.title = title;
		this.theater = theater;
		this.posterUrl = posterUrl;
		this.bannerUrl = bannerUrl;
		this.director = director;
		this.overview = overview;
		this.genre = genre;
		this.rated = rated;
		this.releasedDate = releasedDate;
		this.duration = duration;
	}

	public Movie() {
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTheater() {
		return theater;
	}

	public void setTheater(String theater) {
		this.theater = theater;
	}

	public String getPosterUrl() {
		return posterUrl;
	}

	public void setPosterUrl(String posterUrl) {
		this.posterUrl = posterUrl;
	}

	public String getBannerUrl() {
		return bannerUrl;
	}

	public void setBannerUrl(String bannerUrl) {
		this.bannerUrl = bannerUrl;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getRated() {
		return rated;
	}

	public void setRated(String rated) {
		this.rated = rated;
	}

	public Date getReleasedDate() {
		return releasedDate;
	}

	public void setReleasedDate(Date releasedDate) {
		this.releasedDate = releasedDate;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	
}
