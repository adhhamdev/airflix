
const MovieCard = ({id, title, name, src, rating}) => {
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
    const imgSrc = imgBaseURL + src;
    const rateHandle = async () => {
      const userRate = prompt(`Rate ${title || name} from 0.5 to 10`);
      await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${JSON.parse(localStorage.getItem('guestSession'))["guest_session_id"]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          "value": userRate
        })
      });
    }
  return (
    <div className="MovieCard">
        <img src={imgSrc} alt={title} loading="lazy" />
        <div className="info">
            <p className="title"><a href="">{title || name}</a></p>
            <p className="rating"><i className="fas fa-star"></i> {rating}</p>
        </div>
        <div className="actions">
            <i className="far fa-star" role="button" title="RATE" onClick={rateHandle}></i>
        </div>
    </div>
  )
}

export default MovieCard