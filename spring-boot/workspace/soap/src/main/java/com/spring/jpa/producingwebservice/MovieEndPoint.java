package com.spring.jpa.producingwebservice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.spring.jpa.entity.MovieEntity;
import com.spring.jpa.service.IMovieService;

@Endpoint
public class MovieEndPoint {
	public static final String NAMESPACE_URI = "http://www.javaspringclub.com/movies-ws";
	@Autowired
	private IMovieService service;

	public MovieEndPoint() {

	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMovieByIdRequest")
	@ResponsePayload
	public GetMovieByIdResponse getMovieById(@RequestPayload GetMovieByIdRequest request) {
		GetMovieByIdResponse response = new GetMovieByIdResponse();
		MovieEntity movieEntity = service.buscarPorId(request.getMovieId());
		MovieType movieType = new MovieType();
		BeanUtils.copyProperties(movieEntity, movieType);
		response.setMovieType(movieType);
		return response;

	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getAllMoviesRequest")
	@ResponsePayload
	public GetAllMoviesResponse getAllMovies(@RequestPayload GetAllMoviesRequest request) {
		GetAllMoviesResponse response = new GetAllMoviesResponse();
		List<MovieType> movieTypeList = new ArrayList<MovieType>();
		List<MovieEntity> movieEntityList = service.listarTodo();
		for (MovieEntity entity : movieEntityList) {
			MovieType movieType = new MovieType();
			BeanUtils.copyProperties(entity, movieType);
			movieTypeList.add(movieType);
		}
		response.getMovieType().addAll(movieTypeList);

		return response;

	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "addMovieRequest")
	@ResponsePayload
	public AddMovieResponse addMovie(@RequestPayload AddMovieRequest request) {
		AddMovieResponse response = new AddMovieResponse();
		MovieType newMovieType = new MovieType();
		ServiceStatus serviceStatus = new ServiceStatus();

		MovieEntity newMovieEntity = new MovieEntity();
		newMovieEntity.setCategory(request.getCategory());
		newMovieEntity.setTitle(request.getTitle());
		MovieEntity savedMovieEntity = service.guardar(newMovieEntity);

		if (savedMovieEntity == null) {
			serviceStatus.setStatusCode("CONFLICTO");
			serviceStatus.setMessage("Error al agregar la Entidad");
		} else {

			BeanUtils.copyProperties(savedMovieEntity, newMovieType);
			serviceStatus.setStatusCode("SUCCESS");
			serviceStatus.setMessage("Agregado Satisfactoriamente");
		}

		response.setMovieType(newMovieType);
		response.setServiceStatus(serviceStatus);
		return response;

	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "updateMovieRequest")
	@ResponsePayload
	public UpdateMovieResponse updateMovie(@RequestPayload UpdateMovieRequest request) {
		UpdateMovieResponse response = new UpdateMovieResponse();
		ServiceStatus serviceStatus = new ServiceStatus();
		// 1. Find if movie available
		MovieEntity movieFromDB = service.buscarPorTitulo(request.getTitle());

		if (movieFromDB == null) {
			serviceStatus.setStatusCode("NO ENCONTRADO");
			serviceStatus.setMessage("Movie = " + request.getTitle() + " no encontrada");
		} else {

			// 2. Get updated movie information from the request
			movieFromDB.setTitle(request.getTitle());
			movieFromDB.setCategory(request.getCategory());
			// 3. update the movie in database

			boolean flag = service.actualizar(movieFromDB);

			if (flag == false) {
				serviceStatus.setStatusCode("CONFLICT");
				serviceStatus.setMessage("Error al actualizar la Entidad=" + request.getTitle());
				;
			} else {
				serviceStatus.setStatusCode("SUCCESS");
				serviceStatus.setMessage("Actualizado Satisfactoriamente");
			}

		}

		response.setServiceStatus(serviceStatus);
		return response;
	}

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "deleteMovieRequest")
	@ResponsePayload
	public DeleteMovieResponse deleteMovie(@RequestPayload DeleteMovieRequest request) {
		DeleteMovieResponse response = new DeleteMovieResponse();
		ServiceStatus serviceStatus = new ServiceStatus();

		boolean flag = service.eliminarPorId(request.getMovieId());

		if (flag == false) {
			serviceStatus.setStatusCode("FAIL");
			serviceStatus.setMessage("No se puede encontrar el id=" + request.getMovieId());
		} else {
			serviceStatus.setStatusCode("SUCCESS");
			serviceStatus.setMessage("Eliminado Satisfactoriamente");
		}

		response.setServiceStatus(serviceStatus);
		return response;
	}
}
