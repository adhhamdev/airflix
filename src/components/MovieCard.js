import { Link, useLocation } from 'react-router-dom';
import { rateHandle } from '../handlers/handlers';

const MovieCard = ({ id, title, name, src, vote_average, rating }) => {
  const location = useLocation();
  const imgBaseURL = 'https://image.tmdb.org/t/p/w500';
  const imgSrc = imgBaseURL + src;

  return (
    <div className='MovieCard'>
      <img src={imgSrc} alt={title || name} loading='lazy' />

      <Link
        to={location.pathname !== '/' ? `../movie/${id}` : `movie/${id}`}
        className='info-link'>
        <div className='info'>
          <p className='title'>{title || name}</p>
          <p className='vote_average'>
            <i className='fas fa-star' /> {vote_average}
          </p>
        </div>
      </Link>

      <div className='actions'>
        <i
          className={rating ? 'fas fa-star' : 'far fa-star'}
          role='button'
          title={rating ? `UNRATE: ${rating}` : 'RATE'}
          onClick={() => rateHandle(id, title, name, rating)}
        />
      </div>
      <div className='actions'>
        <i
          className={rating ? 'fas fa-star' : 'far fa-star'}
          role='button'
          title={rating ? `UNRATE: ${rating}` : 'RATE'}
          onClick={() => rateHandle(id, title, name, rating)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
