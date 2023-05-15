const PersonCard = ({ original_name, profile_path, popularity }) => {
  const imgBaseURL = "https://image.tmdb.org/t/p/w500";
  const imgSrc = imgBaseURL + profile_path;
  return (
    <div className="PersonCard">
      <img src={imgSrc} alt={original_name} loading="lazy" />
      <div className="info">
        <p className="name">
          <a href="">{original_name}</a>
        </p>
        <p className="popularity">
          <i className="fas fa-star"></i> {popularity}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
