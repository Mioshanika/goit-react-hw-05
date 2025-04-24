import s from './moviedetailspage.module.css';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SiImdb } from 'react-icons/si';
import { IoHome } from 'react-icons/io5';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { getMovieById } from '../../services/tmdb-api';
import Loader from '../../components/loader/loader';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentLocation = useLocation();
  const goBackRef = useRef(currentLocation.state ?? '/movies');
  const toastCfg = {
    position: 'top-right',
    style: {
      border: '1px solid var(--bg-color)',
      padding: '4px 12px',
      color: 'var(--bg-color)',
      backgroundColor: 'var(--txt-color)',
    },
  };
  const validateMovie = movie => {
    const values = { ...movie };
    values.poster_path = Boolean(movie.poster_path)
      ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
      : 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
    values.genres = Boolean(movie.genres)
      ? movie.genres
          .filter((item, idx) => idx < 3)
          .map(item => item.name)
          .join(' ❀ ')
      : '';
    return values;
  };

  useEffect(() => {
    const cancelQuery = new AbortController();
    const requestAPI = async () => {
      try {
        setIsLoading(true);
        const apiData = await getMovieById(movieId, cancelQuery.signal);
        setMovie(validateMovie(apiData));
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          toast.error(`Request error occured`, toastCfg);
        }
      } finally {
        setIsLoading(false);
      }
    };
    requestAPI();
    return () => {
      cancelQuery.abort();
    };
  }, [movieId]);

  return (
    <div className="page">
      <Link to={goBackRef.current}>
        <RiArrowGoBackFill size={24} />
        Go back
      </Link>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={s.movie_box}>
          <div className={s.poster_genres}>
            <h2>{movie.title}</h2>
            <img src={movie.poster_path} alt={'Movie poster'} width={250} />
            {Boolean(movie.genres) && <p className={s.genres}>{movie.genres}</p>}
          </div>

          <nav className={s.movie_nav}>
            {Boolean(movie.imdb_id) && (
              <Link to={'https://www.imdb.com/title/' + movie.imdb_id} target={'_blank'}>
                <SiImdb size={24} />
              </Link>
            )}
            {Boolean(movie.homepage) && (
              <Link to={movie.homepage} target={'_blank'}>
                <IoHome size={24} />
              </Link>
            )}
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </nav>

          <div className={s.outlet}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
