import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import VerticalList from "../components/VerticalList";
import Paginator from "../components/Paginator";
import { turnNextPage, turnPrevPage } from "../handlers/handlers";

const Home = () => {
  const { trendings, discovers } = useLoaderData();
  const [movieLists, setMovieLists] = useState({
    trending: trendings.results,
    discover: discovers.results,
  });
  const [page, setPage] = useState({
    all: 1,
    popular: 1,
    now_playing: 1,
    top_rated: 1,
    upcoming: 1,
  });
  const [arrange, setArrange] = useState({
    filter: "",
    sort: "",
  });

  useEffect(() => {
    const fetchDiscover = async () => {
      const resUrl =
        arrange.filter == "popular"
          ? "movie/popular"
          : arrange.filter == "now_playing"
            ? "movie/now_playing"
            : arrange.filter == "top_rated"
              ? "movie/top_rated"
              : arrange.filter == "upcoming"
                ? "movie/upcoming"
                : "discover/movie";
      const discover = await (
        await fetch(
          `https://api.themoviedb.org/3/${resUrl}?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&${arrange.sort && `sort_by=${arrange.sort}`
          }&page=${page[arrange.filter == "" ? "all" : arrange.filter]}`
        )
      ).json();
      setMovieLists((prev) => ({ ...prev, discover: discover.results }));
      if (discover.results.length > 0) {
        caches.open("discovers").then((cache) => {
          cache.put("discovers", new Response(JSON.stringify(discover)));
        });
      }
    };
    fetchDiscover();
  }, [arrange, page]);

  window.onkeyup = (e) => {
    if (e.key == "ArrowRight") {
      document.querySelector(".nextBtn").click();
      document.querySelector(".nextBtn").focus();
    } else if (e.key == "ArrowLeft") {
      document.querySelector(".prevBtn").click();
      document.querySelector(".prevBtn").focus();
    }
  };

  const appropriatePage = () => {
    return page[arrange.filter ? arrange.filter : "all"];
  };

  return (
    <div className="Home">
      <section className="trending">
        <div className="listHead">
          <h3 className="listTitle">◈ TRENDING</h3>
        </div>
        <div className="horizontalList">
          {movieLists.trending.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              src={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </section>
      <section className="discover">
        <div className="listHead">
          <h3 className="listTitle">◈ DISCOVER</h3>
          <div className="listActions">
            <div className="arrangeActions filter">
              <button
                className={`filterBtn ${arrange.filter == "" && "active"}`}
                onClick={() => {
                  setArrange((prev) => ({ ...prev, filter: "" }));
                }}
              >
                ALL
              </button>
              <button
                className={`filterBtn ${arrange.filter == "popular" && "active"
                  }`}
                onClick={() => {
                  setArrange((prev) => ({ ...prev, filter: "popular" }));
                }}
              >
                POPULAR
              </button>
              <button
                className={`filterBtn ${arrange.filter == "top_rated" && "active"
                  }`}
                onClick={() => {
                  setArrange((prev) => ({ ...prev, filter: "top_rated" }));
                }}
              >
                TOP RATED
              </button>
              <button
                className={`filterBtn ${arrange.filter == "upcoming" && "active"
                  }`}
                onClick={() => {
                  setArrange((prev) => ({ ...prev, filter: "upcoming" }));
                }}
              >
                UPCOMING
              </button>
              <button
                className={`filterBtn ${arrange.filter == "now_playing" && "active"
                  }`}
                onClick={() => {
                  setArrange((prev) => ({ ...prev, filter: "now_playing" }));
                }}
              >
                NOW PLAYING
              </button>
            </div>
            {!arrange.filter && (
              <div className="arrangeActions sort">
                <button
                  className={`sortBtn ${arrange.sort == "" && "active"}`}
                  onClick={() => setArrange((prev) => ({ ...prev, sort: "" }))}
                >
                  ALL
                </button>
                <button
                  className={`sortBtn ${(arrange.sort == "popularity.asc" ||
                    arrange.sort == "popularity.desc") &&
                    "active"
                    }`}
                  onClick={() =>
                    setArrange((prev) => ({
                      ...prev,
                      sort:
                        prev.sort == "popularity.desc"
                          ? "popularity.asc"
                          : "popularity.desc",
                    }))
                  }
                >
                  POPULARITY <i className="fas fa-sort"></i>
                </button>
                <button
                  className={`sortBtn ${(arrange.sort == "release_date.asc" ||
                    arrange.sort == "release_date.desc") &&
                    "active"
                    }`}
                  onClick={() =>
                    setArrange((prev) => ({
                      ...prev,
                      sort:
                        prev.sort == "release_date.desc"
                          ? "release_date.asc"
                          : "release_date.desc",
                    }))
                  }
                >
                  RELEASE DATE <i className="fas fa-sort"></i>
                </button>
                <button
                  className={`sortBtn ${(arrange.sort == "rating.asc" ||
                    arrange.sort == "rating.desc") &&
                    "active"
                    }`}
                  onClick={() =>
                    setArrange((prev) => ({
                      ...prev,
                      sort:
                        prev.sort == "rating.desc"
                          ? "rating.asc"
                          : "rating.desc",
                    }))
                  }
                >
                  RATING <i className="fas fa-sort"></i>
                </button>
                <button
                  className={`sortBtn ${(arrange.sort == "revenue.asc" ||
                    arrange.sort == "revenue.desc") &&
                    "active"
                    }`}
                  onClick={() =>
                    setArrange((prev) => ({
                      ...prev,
                      sort:
                        prev.sort == "revenue.desc"
                          ? "revenue.asc"
                          : "revenue.desc",
                    }))
                  }
                >
                  REVENUE <i className="fas fa-sort"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <VerticalList list={movieLists.discover} />
      </section>
      <Paginator
        prevFunc={() => turnPrevPage(setPage, arrange, page)}
        page={appropriatePage()}
        nextFunc={() => turnNextPage(setPage, arrange, page, discovers)}
      />
    </div>
  );
};

export default Home;
