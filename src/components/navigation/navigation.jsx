import s from './navigation.module.css';
import { NavLink } from 'react-router-dom';
import { GiVideoCamera } from 'react-icons/gi';

export default function Navigation() {
  return (
    <div className={s.navbar}>
      <header>
        <GiVideoCamera size={44} />
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <hr />
    </div>
  );
}
