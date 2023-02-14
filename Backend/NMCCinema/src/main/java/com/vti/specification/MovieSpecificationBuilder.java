package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.entity.Movie;

public class MovieSpecificationBuilder {

	private String search;

	public MovieSpecificationBuilder(String search) {
		this.search = search;
	}
	
	@SuppressWarnings("deprecation")
	public Specification<Movie> build() {
		
		SearchCriteria searchCriteria = new SearchCriteria("title", "Like", search);
		
		Specification<Movie> where = null;
		
		if (!StringUtils.isEmpty(search)) {
			where = new MovieSpecification(searchCriteria);
		}
		
		return where;
	}
}
