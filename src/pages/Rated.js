import { useEffect, useState } from "react";
import VerticalList from "../components/VerticalList";

const Rated = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      const guestSession = JSON.parse(localStorage.getItem("guestSession"));
      if (guestSession) {
        const getRatedMovies = await fetch(
          `https://api.themoviedb.org/3/guest_session/${guestSession["guest_session_id"]}/rated/movies?api_key=08a7337c36b62d4a8a9dfafd26b3afb6`
        ).then((res) => res.json());

        setRatedMovies(getRatedMovies.results || []);

        if (getRatedMovies.results) {
          caches
            .open("ratedMovies")
            .then((cache) =>
              cache.put(
                "ratedMovies",
                new Response(JSON.stringify(getRatedMovies))
              )
            );
        }
      }
    };

    fetchRatedMovies();
  }, []);

  return (
    <div className="Rated">
      <h1 className="pageTitle">Rated</h1>
      {ratedMovies.length ? (
        <VerticalList list={ratedMovies} />
      ) : (
        <p className="noResults">NO RATED MOVIES... <br /> Start rating movies on Explore</p>
      )}
    </div>
  );
};

export default Rated;
