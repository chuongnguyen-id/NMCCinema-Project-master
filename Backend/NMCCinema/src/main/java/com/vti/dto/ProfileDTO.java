package com.vti.dto;

public class ProfileDTO {

	private int id;
	
	private String userName;

	private String email;

	private String firstName;

	private String lastName;
	
	private String phoneNumber;

	private String role;

	private String status;

	public ProfileDTO(int id,String userName, String email, String firstName, String lastName, String phoneNumber, String role, String status) {
		this.id = id;
		this.userName = userName;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.role = role;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public String getUserName() {
		return userName;
	}

	public String getEmail() {
		return email;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getRole() {
		return role;
	}

	public String getStatus() {
		return status;
	}

}
