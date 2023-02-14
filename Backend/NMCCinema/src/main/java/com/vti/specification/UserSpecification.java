package com.vti.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.vti.entity.User;

public class UserSpecification implements Specification<User> {

	private static final long serialVersionUID = 1L;
	private SearchCriteria criteria;
	
	public UserSpecification(SearchCriteria criteria) {
		this.criteria = criteria;
	}

	@Override
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		
		if (criteria.getOperator().equalsIgnoreCase("Like")) {
			return criteriaBuilder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
		}
		
		return null;
	}

}
