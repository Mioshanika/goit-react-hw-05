import s from './movielist.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ hits }) {
  const currentLocation = useLocation();
  return (
    <ul className={s.movie_list}>
      {hits.map(movie => (
        <li key={movie.id}>
          <Link state={currentLocation} to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
