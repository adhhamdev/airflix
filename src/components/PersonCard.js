const PersonCard = ({ original_name, profile_path, popularity }) => {
  const imgBaseURL = 'https://image.tmdb.org/t/p/w500';
  const imgSrc = imgBaseURL + profile_path;
  return (
    <div className='PersonCard'>
      <div className='person-image'>
        <img src={imgSrc} alt={original_name} loading='lazy' />
      </div>

      <div className='info'>
        <h3 className='name'>{original_name}</h3>
        <p className='popularity'>
          <i className='fas fa-users'></i> {popularity.toFixed(1)}
        </p>
      </div>
    </div>
  );
};
export default PersonCard;
