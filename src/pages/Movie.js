import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { rateHandle } from "../handlers/handlers"

const Movie = () => {
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
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
            setMovieData({ movie: data, keywords: keywordsJson.keywords, similarMovies: similarsJson.results })
            caches.open('movies').then(cache => {
                cache.put(`movie-${movieId}`, new Response(JSON.stringify(data)));
                cache.put(`keywords-${movieId}`, new Response(JSON.stringify(keywordsJson)));
                cache.put(`similars-${movieId}`, new Response(JSON.stringify(similarsJson)));
            });
        }
        getMovie()
    }, [params]);
    return (
        <div className="Movie">
            <div className="movieNav">
                <Link className="backBtn" to="/"><i className="fas fa-arrow-left"></i> BACK</Link>
            </div>
            <main className="movieInfo">
                <div className="showcase">
                    {movieData.movie.backdrop_path ? <img className="backdrop" src={imgBaseURL + movieData.movie.backdrop_path} alt={movieData.movie.original_title} /> : <div className="backdropFB"></div>}
                    <div className="showcaseInfo">
                        <h1 className="movieTitle" title={movieData.movie.original_title}>{movieData.movie.original_title}</h1>
                        <p className="movieVote"><i className="fas fa-star"></i> {movieData.movie.vote_average}</p>
                        <p className="movieLang"><i className="fas fa-language"></i> {movieData.movie.original_language}</p>
                        <button className="movieStarBtn"
                            onClick={() => rateHandle(movieData.movie.id, movieData.movie.title, movieData.movie.name, movieData.movie.rating)}
                        >
                            <i className="far fa-star"></i> RATE IT
                        </button>
                    </div>
                </div>
                <div className="movieContent">
                    {movieData.movie.tagline &&
                        <div>
                            <h2>TAGLINE</h2>
                            <p className="movieTagline">{movieData.movie.tagline}</p>
                        </div>
                    }
                    <div>
                        <h2>OVERVIEW</h2>
                        <p className="movieOverview">{movieData.movie.overview}</p>
                    </div>
                    <div className="properties">
                        <p className="property movieReleaseDate"><span>RELEASE DATE :</span> {movieData.movie.release_date}</p>
                        <p className="property movieRuntime"><span>RUNTIME :</span> {movieData.movie.runtime} min</p>
                        <p className="property movieBudget"><span>BUDGET :</span> {movieData.movie.budget} $</p>
                        <p className="property movieRevenue"><span>REVENUE :</span> {movieData.movie.revenue} $</p>
                        <p className="property movieStatus"><span>STATUS :</span> {movieData.movie.status}</p>
                    </div>
                    <div className="property keywords">
                        <h2>KEYWORDS</h2>
                        <div>
                            {movieData.keywords.map((kw) => {
                                return (
                                    <span key={kw.id} className="keyword">{kw.name}</span>
                                )
                            })}
                        </div>
                    </div>
                    <div className="movieGenres">
                        <h2>GENRES</h2>
                        {movieData.movie.genres.map((genre) => {
                            return <span key={genre.id} className="genre">{genre.name}</span>
                        })}
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
                <h2 className="similarMoviesTitle">SIMILAR MOVIES</h2>
                <div className="similarMoviesList">
                    {movieData.similarMovies.map((movie) => {
                        return (
                            <Link to={`../movie/${movie.id}`} key={movie.id} className="similarMovie">
                                {movie.backdrop_path ? <img className="similarTN" src={imgBaseURL + movie.backdrop_path} alt="Movie Backdrop" /> : <div className="similarTNFallback"></div>}
                                <div className="similarMovieInfo">
                                    <p className="similarMovieTitle">{movie.title}</p>
                                    <p className="similarMovieRating"><i className="fas fa-star"></i> {movie.vote_average}</p>
                                    <p className="similarMovieLang"><i className="fas fa-language"></i> {movie.original_language}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </aside>
        </div>
    )
}

export default Movie