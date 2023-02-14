package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.entity.User;

public class UserSpecificationBuilder {

	private String search;

	public UserSpecificationBuilder(String search) {
		this.search = search;
	}
	
	@SuppressWarnings("deprecation")
	public Specification<User> build() {
		
		SearchCriteria searchCriteria = new SearchCriteria("name", "Like", search);
		
		Specification<User> where = null;
		
		if (!StringUtils.isEmpty(search)) {
			where = new UserSpecification(searchCriteria);
		}
		
		return where;
	}
}
