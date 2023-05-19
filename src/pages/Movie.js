import { Link, useLoaderData, } from "react-router-dom"
import { rateHandle } from "../handlers/handlers"
import { useState } from "react";

const Movie = () => {
    const { movie, keywords, similars, videos, watchProviders, credits, recommendations } = useLoaderData();
    const [starBtn, setStarBtn] = useState({ text: "RATE IT", icon: "far fa-star" });
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.querySelector(".scrollToTop").style.display = "block";
        } else {
            document.querySelector(".scrollToTop").style.display = "none";
        }
    }
    return (
        <div className="Movie">
            <div className="movieNav">
                <Link className="backBtn" to="/"><i className="fas fa-arrow-left"></i> BACK</Link>
            </div>
            <main className="movieInfo">
                <div className="showcase">
                    {movie.backdrop_path ? <img className="backdrop" src={imgBaseURL + movie.backdrop_path} alt={movie.original_title} /> : <div className="backdropFB"></div>}
                    <div className="showcaseInfo">
                        <h1 className="movieTitle" title={movie.original_title}>{movie.original_title}</h1>
                        <button className="movieStarBtn"
                            onClick={() => {
                                if (starBtn.text == "RATE IT") {
                                    rateHandle(movie.id, movie.title, movie.name, movie.rating)
                                    setStarBtn({ text: "RATED", icon: "fas fa-star" })
                                } else {
                                    setStarBtn({ text: "RATE IT", icon: "far fa-star" })
                                }
                            }}
                        > 
                            <i className={starBtn.icon}></i> {starBtn.text}
                        </button>
                        <p className="movieLang"><i className="fas fa-language"></i> {movie.original_language}</p>
                    </div>
                </div>
                <div className="movieContent">
                    {movie.tagline &&
                        <div>
                            <h2>TAGLINE</h2>
                            <p className="movieTagline">{movie.tagline}</p>
                        </div>
                    }
                    <div>
                        <h2>OVERVIEW</h2>
                        <p className="movieOverview">{movie.overview}</p>
                    </div>
                    <div className="properties">
                        <p className="property movieReleaseDate"><span>RELEASE DATE :</span> {movie.release_date}</p>
                        <p className="property movieRuntime"><span>RUNTIME :</span> {movie.runtime} min</p>
                        <p className="property movieBudget"><span>BUDGET :</span> {movie.budget} $</p>
                        <p className="property movieRevenue"><span>REVENUE :</span> {movie.revenue} $</p>
                        <p className="property movieStatus"><span>STATUS :</span> {movie.status}</p>
                    </div>
                    <div className="property keywords">
                        <h2>KEYWORDS</h2>
                        <div>
                            {keywords.map((keyword) => {
                                return <span key={keyword.id} className="keyword">{keyword.name}</span>
                            })
                            }
                        </div>
                    </div>
                    <div className="movieGenres">
                        <h2>GENRES</h2>
                        {movie.genres.map((genre) => {
                            return <span key={genre.id} className="genre">{genre.name}</span>
                        })}
                    </div>
                </div>
                {watchProviders.length > 0 &&
                    <div className="watchProviders">
                        <h2>WATCH PROVIDERS</h2>
                        <div className="watchProvidersList">
                            {(watchProviders.find(provider => provider[0] == 'US')[1].flatrate || watchProviders.find(provider => provider[0] == 'US')[1].buy).map((provider) => {
                                return (
                                    <div key={provider.provider_name} className="watchProvider">
                                        <img className="providerLogo" src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                                        <p className="providerName">{provider.provider_name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                <div className="videos"> 
                    <h2>VIDEOS</h2>
                    {videos.map((video) => {
                        return (
                            <div key={video.id} className="video">
                                <iframe loading="lazy" width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title={video.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                <p className="videoName">{video.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="credits">

                </div>
                <div className="recommendations">

                </div>
            </main>
            <aside className="similarMovies">
                <h2 className="similarMoviesTitle">SIMILAR MOVIES</h2>
                <div className="similarMoviesList">
                    {similars ? similars.map((movie) => {
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
                    }) : <p className="noSimilars">No similar movies found...</p>}
                </div>
            </aside>
            <div className="scrollToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <i className="fas fa-arrow-up"></i>
            </div>
        </div>
    )
}

export default Movie