
const MovieCard = ({id, title, name, src, vote_average, rating}) => {
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
    const imgSrc = imgBaseURL + src;
    const rateHandle = async () => {
      if(!rating) {
        const userRate = prompt(`Rate ${title || name} from 0.5 to 10`);
        if(userRate > 0.5 && userRate < 10) {
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
      } else {
        await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=08a7337c36b62d4a8a9dfafd26b3afb6&guest_session_id=${JSON.parse(localStorage.getItem('guestSession'))["guest_session_id"]}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        });
      }
    }
  return (
    <div className="MovieCard">
        <img src={imgSrc} alt={title} loading="lazy" />
        <div className="info">
            <p className="title"><a href="">{title || name}</a></p>
            <p className="vote_average"><i className="fas fa-star"></i> {vote_average}</p>
        </div>
        <div className="actions">
            <i className={`${rating ? 'fas' : 'far'} fa-star`} role="button" title={rating ? `UNRATE: ${rating}` : 'RATE'} onClick={rateHandle}></i>
        </div>
    </div>
  )
}

export default MovieCard