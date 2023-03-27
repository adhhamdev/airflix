import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const Home = () => {
  const {trendings, discovers} = useLoaderData();
  const [movieLists, setMovieLists] = useState({
    trending: trendings.results,
    discover: discovers.results
  });
  const [arrange, setArrange] = useState({
    filter: "",
    sort: ""
  });

  useEffect(() => {
    const fetchDiscover = async () => {
      const resUrl = arrange.filter == 'popular' ? 'movie/popular' : arrange.filter == 'now_playing' ? '/movie/now_playing' : arrange.filter == 'top_rated' ? '/movie/top_rated' : arrange.filter == 'upcoming' ?  '/movie/upcoming' : 'discover/movie';
      const discover = await (await fetch(`https://api.themoviedb.org/3/${resUrl}?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&sort_by${arrange.sort}`)).json();
      setMovieLists(prev => ({...prev, discover: discover.results}))
    }
    fetchDiscover();
  }, [arrange])
  return (
    <div className="Home">
      <section className="trending">
        <div className="listHead">
          <h3 className="listTitle">◈ TRENDING</h3>
          <a href="" className="seeMore">SEE MORE »</a>
        </div>
        <div className="horizontalList">
          {movieLists.trending.map((movie) => (
            <MovieCard key={movie.id} title={movie.original_title} src={movie.poster_path} rating={movie.vote_average} />
          ))}
        </div>
      </section>
      <section className="discover">
        <div className="listHead">
          <h3 className="listTitle">◈ DISCOVER</h3>
          <div className="listActions">
            <div className="arrangeActions filter">
              FILTER:
              <button className={`filterBtn ${arrange.filter == '' && 'active'}`} onClick={() => setArrange(prev => ({...prev, filter: ''}))}>ALL</button>
              <button className={`filterBtn ${arrange.filter == 'popular' && 'active'}`} onClick={() => setArrange(prev => ({...prev, filter: 'popular'}))}>POPULAR</button>
              <button className={`filterBtn ${arrange.filter == 'top_rated' && 'active'}`} onClick={() => setArrange(prev => ({...prev, filter: 'top_rated'}))}>TOP RATED</button>
              <button className={`filterBtn ${arrange.filter == 'upcoming' && 'active'}`} onClick={() => setArrange(prev => ({...prev, filter: 'upcoming'}))}>UPCOMING</button>
              <button className={`filterBtn ${arrange.filter == 'now_playing' && 'active'}`} onClick={() => setArrange(prev => ({...prev, filter: 'now_playing'}))}>NOW PLAYING</button>
            </div>
            <div className="arrangeActions sort">
              SORT:
              <button className={`sortBtn ${arrange.sort == '' && 'active'}`} onClick={() => setArrange(prev => ({...prev, sort: ''}))}>ALL</button>
              <button className={`sortBtn ${(arrange.sort == 'popularity.asc' || arrange.sort == 'popularity.desc') && 'active'}`} onClick={() => setArrange(prev => ({...prev, sort: prev.sort == 'popularity.desc' ? 'popularity.asc' : 'popularity.desc'}))}>POPULARITY <i className="fas fa-sort"></i></button>
              <button className={`sortBtn ${(arrange.sort == 'release_date.asc' || arrange.sort == 'release_date.desc') && 'active'}`} onClick={() => setArrange(prev => ({...prev, sort: prev.sort == 'release_date.desc' ? 'release_date.asc' : 'release_date.desc'}))}>RELEASE DATE <i className="fas fa-sort"></i></button>
              <button className={`sortBtn ${(arrange.sort == 'rating.asc' || arrange.sort == 'rating.desc') && 'active'}`} onClick={() => setArrange(prev => ({...prev, sort: prev.sort == 'rating.desc' ? 'rating.asc' : 'rating.desc'}))}>RATING <i className="fas fa-sort"></i></button>
              <button className={`sortBtn ${(arrange.sort == 'revenue.asc' || arrange.sort == 'revenue.desc') && 'active'}`} onClick={() => setArrange(prev => ({...prev, sort: prev.sort == 'revenue.desc' ? 'revenue.asc' : 'revenue.desc'}))}>REVENUE <i className="fas fa-sort"></i></button>
            </div>
          </div>
        </div>
        <div className="verticalList">
          {movieLists.discover.map((movie) => (
            <MovieCard key={movie.id} title={movie.original_title} src={movie.poster_path} rating={movie.vote_average} />
          ))}
          <div className="MovieCard loadMoreCard">
            <p>LOAD MORE</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home