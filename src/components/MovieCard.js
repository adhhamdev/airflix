
const MovieCard = ({title, src, rating}) => {
    const imgBaseURL = "https://image.tmdb.org/t/p/w500";
    const imgSrc = imgBaseURL + src;
  return (
    <div className="MovieCard">
        <img src={imgSrc} alt={title} loading="lazy" />
        <div className="info">
            <p className="title"><a href="">{title}</a></p>
            <p className="rating"><i className="fas fa-star"></i> {rating}</p>
        </div>
        <div className="actions">
            <i className="fas fa-plus" role="button" title="ADD TO"></i>
            <i className="far fa-heart"role="button" title="LIKE"></i>
        </div>
    </div>
  )
}

export default MovieCard