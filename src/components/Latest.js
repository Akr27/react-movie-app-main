import React from 'react';

const Latest = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
                <div className='cont'>
				<div className='image-container d-flex justify-content-start m-3'>
					<img className='poster' src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
                </div>
			))}
		</>
	);
};

export default Latest;