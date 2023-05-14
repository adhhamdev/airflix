import { Link } from "react-router-dom";
import { rateHandle } from "../handlers/handlers";

const MovieCard = ({id, title, name, src, vote_average, rating}) => {
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
    const imgSrc = imgBaseURL + src;
  return (
    <div className="MovieCard">
        <img src={imgSrc} alt={title} loading="lazy" />
        <div className="info">
            <p className="title"><Link to={`movie/${id}`}>{title || name}</Link></p>
            <p className="vote_average"><i className="fas fa-star"></i> {vote_average}</p>
        </div>
        <div className="actions">
            <i className={`${rating ? 'fas' : 'far'} fa-star`} role="button" title={rating ? `UNRATE: ${rating}` : 'RATE'} onClick={() => rateHandle(id, title, name, rating)}></i>
        </div>
    </div>
  )
}

export default MovieCard