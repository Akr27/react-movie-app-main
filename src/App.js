import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';



const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [latest, setLatest] = useState([]);
	const [indian,setIndian]=useState([]);
	const [comingsoon,setComingsoon]=useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		//const url = `https://api.themoviedb.org/3/search/movie?api_key=fa48b403d095951a88caab2b095d4edf&query=${searchValue}&language=en-US&page=1&include_adult=false`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const getLatest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=new&y=2022&apikey=263d22d8`;
		//const url = `https://api.themoviedb.org/3/search/movie?api_key=fa48b403d095951a88caab2b095d4edf&query=${searchValue}&language=en-US&page=1&include_adult=false`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setLatest(responseJson.Search);
		}
	};

	const getIndian = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=India&apikey=263d22d8`;
		//const url = `https://api.themoviedb.org/3/search/movie?api_key=fa48b403d095951a88caab2b095d4edf&query=${searchValue}&language=en-US&page=1&include_adult=false`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setIndian(responseJson.Search);
		}
	};

	const getComingsoon = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=man&y=2023&apikey=263d22d8`;
		//const url = `https://api.themoviedb.org/3/search/movie?api_key=fa48b403d095951a88caab2b095d4edf&query=${searchValue}&language=en-US&page=1&include_adult=false`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setComingsoon(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() =>{
		getLatest(searchValue);
	},[searchValue]);

	useEffect(() =>{
		getIndian(searchValue);
	},[searchValue]);

	useEffect(() =>{
		getComingsoon(searchValue);
	},[searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const showDetails = (movie) => {};

	/*function HomeButton() {
		let history = useHistory();
	  
		function handleClick() {
		  history.push("/home");
		}
	  
		return (
		  <button type="button" onClick={handleClick}>
			Go home
		  </button>
		);
	  }*/

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleMovieDetails={showDetails}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Latest' />				
			</div>
			<div className='row'>
				<MovieList
					movies={latest}
					handleMovieDetails={showDetails}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Indian Movies' />				
			</div>
			<div className='row'>
				<MovieList
					movies={indian}
					handleMovieDetails={showDetails}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Coming Soon' />				
			</div>
			<div className='row'>
				<MovieList
					movies={comingsoon}
					handleMovieDetails={showDetails}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleMovieDetails={showDetails}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
