import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const Movie = () => {
    const params = useParams();
    const movieId = params.id;
    const [movieData, setMovieData] = useState({
        movie: {
            genres: []
        },
        keywords: [],
        similarMovies: [],
    });
    useEffect(() => {
        const getMovie = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`);
            const data = await response.json();
            const getKeywords = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`);
            const keywordsJson = await getKeywords.json();
            const getSimilars = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`);
            const similarsJson = await getSimilars.json();
            setMovieData({movie: data, keywords: keywordsJson.keywords, similarMovies: similarsJson.results})
        }
        getMovie()
    }, []);
  return (
    <div className="Movie">
        <div className="movieNav">
            <Link to="/"><i className="fas fa-arrow-left"></i> BACK</Link>
        </div>
        <main className="movieInfo">
            <img className="backdrop" src={movieData.movie.backdrop_path} alt={movieData.movie.original_title} />
            <div className="movieContent">
                <h1 className="movieTitle">{movieData.movie.original_title}</h1>
                <p className="movieTagline">{movieData.movie.tagline}</p>
                <p className="movieOverview">{movieData.movie.overview}</p>
                <p className="movieVote"><i className="fas fa-star"></i> {movieData.movie.vote_average}</p>
                <p className="keywords">
                    {movieData.keywords.map((kw) => {
                        return (
                            <span key={kw.id} className="keyword">{kw.name}</span>
                        )
                    })}
                </p>
                <div className="movieGenres">
                    {movieData.movie.genres.map((genre) => {
                        return <span key={genre.id} className="genre">{genre.name}</span>
                    })}
                </div>
                <div className="movieActions">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-plus"></i>
                    <i className="fas fa-share-alt"></i>
                </div>
            </div>
            <div className="videos">

            </div>
            <div className="watchProviders">

            </div>
            <div className="credits">

            </div>
            <div className="recommendations">

            </div>
        </main>
        <aside className="similarMovies">
            <h2 className="similarMoviesTitle">Similar Movies</h2>
            <div className="similarMoviesList">
                {movieData.similarMovies.map((movie) => {
                    return (
                        <div className="similarMovie">
                            <img src="https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg" alt="Movie Backdrop" />
                            <div className="similarMovieInfo">
                                <p className="similarMovieTitle">Movie Title</p>
                                <p className="similarMovieRating"><i className="fas fa-star"></i> 5.6</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </aside>
    </div>
  )
}

export default Movie