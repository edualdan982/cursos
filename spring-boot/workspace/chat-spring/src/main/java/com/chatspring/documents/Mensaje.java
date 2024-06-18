package com.chatspring.documents;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mensaje implements Serializable{
	private String texto;
	private Long fecha;
	private String username;
	private String tipo;
	private String color;
	
	private static final long serialVersionUID = 1L;

}
