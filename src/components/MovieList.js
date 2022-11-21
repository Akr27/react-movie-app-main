import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div class='cont'>
				<div className='image-container d-flex justify-content-start m-3'>
					<div onClick={() => props.handleMovieDetails(movie)}></div>
					<img className='poster' src={movie.Poster} alt='movie'  /*onClick={() => props.handleMovieDetails(movie)}*/></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>					
				</div>	
				<div className='movie-title'>{movie.Title} ({movie.Year})</div>
				</div>			
			))}
		</>
	);
};

export default MovieList;
