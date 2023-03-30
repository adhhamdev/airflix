import MovieCard from "./MovieCard"

const VerticalList = ({list}) => {
  return (
    <div className="verticalList">
        {list && list.map((movie) => (
        movie.poster_path && <MovieCard key={movie.id} title={movie.original_title} name={movie.name} src={movie.poster_path} rating={movie.vote_average} />
        ))}
    </div>
  )
}

export default VerticalList