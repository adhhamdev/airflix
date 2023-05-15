import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

const VerticalList = ({ list }) => {
  return (
    <div className="verticalList">
      {list &&
        list.map(
          (movie) =>
            (movie.poster_path &&
              (movie.media_type ? movie.media_type == "movie" : true) && (
                <MovieCard
                  id={movie.id}
                  key={movie.id}
                  title={movie.original_title}
                  name={movie.name}
                  src={movie.poster_path}
                  vote_average={movie.vote_average}
                  rating={movie.rating}
                />
              )) ||
            (movie.media_type == "person" && movie.profile_path && (
              <PersonCard
                key={movie.id}
                original_name={movie.original_name}
                profile_path={movie.profile_path}
                popularity={movie.popularity}
              />
            ))
        )}
    </div>
  );
};

export default VerticalList;
